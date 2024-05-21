import express from "express";
import compression from "compression";
import { renderPage } from "vike/server";
// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === "production";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = `${__dirname}`;

import { auth } from "express-openid-connect";

const app = express();

app.use(compression());

if (isProduction) {
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${root}/../dist/client`));
} else {
    const vite = await import("vite");
    const viteDevMiddleware = (
        await vite.createServer({
            root,
            server: { middlewareMode: true }
        })
    ).middlewares;
    app.use(viteDevMiddleware);
}

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: "a long, randomly-generated string stored in env",
    baseURL: "http://localhost:8192",
    clientID: "4fjy2FwPgEdcmy99XwQmbIMjvsXMft8L",
    issuerBaseURL: "https://splintel-dev.us.auth0.com"
};

app.use(auth(config));

app.get("*", async (req, res, next) => {
    console.log(root);
    const pageContextInit = {
        urlOriginal: req.originalUrl
    };
    console.log(pageContextInit);
    const pageContext = await renderPage(pageContextInit);
    //console.dir(pageContext);
    if (pageContext.errorWhileRendering) {
        console.log(pageContext.abortReason);
    } else {
        console.log("Everything Fine");
    }
    const { httpResponse } = pageContext;
    if (!httpResponse) {
        console.log("True", httpResponse);
        return next();
    } else {
        console.log("False", httpResponse);
        const { body, statusCode, headers, earlyHints } = httpResponse;
        if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
        headers.forEach(([name, value]) => res.setHeader(name, value));
        res.status(statusCode);
        res.send(body);
    }
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
app.listen(port);
// eslint-disable-next-line no-console
console.log(`Server running at http://localhost:${port}`);

export default app;
