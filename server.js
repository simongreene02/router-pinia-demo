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

startServer();

async function startServer() {
    const app = express();

    app.use(compression());

    if (isProduction) {
        const sirv = (await import("sirv")).default;
        app.use(sirv(`${root}/dist/client`));
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
        const pageContextInit = {
            urlOriginal: req.originalUrl
        };
        const pageContext = await renderPage(pageContextInit);
        if (pageContext.errorWhileRendering) {
            // eslint-disable-next-line no-console
            console.error(pageContext.abortReason);
        }
        const { httpResponse } = pageContext;
        if (!httpResponse) {
            return next();
        } else {
            const { body, statusCode, headers, earlyHints } = httpResponse;
            if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
            headers.forEach(([name, value]) => res.setHeader(name, value));
            res.status(statusCode);
            res.send(body);
        }
    });

    // eslint-disable-next-line no-undef
    const port = process.env.PORT || 8192;
    app.listen(port);
    // eslint-disable-next-line no-console
    console.log(`Server running at http://localhost:${port}`);
}
