export { onCreateApp };

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const onCreateApp = (pageContext) => {
    const { app } = pageContext;

    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            defaultTheme: "dark",
        },
    });

    app.use(vuetify);
};
