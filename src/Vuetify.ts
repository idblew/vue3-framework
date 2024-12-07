import { createVuetify } from "vuetify";
import { dark, light, Theme } from "./theme/ThemeStore";

const vuetify = createVuetify({
    defaults: {
        VTextField: {
            persistentPlaceholder: true,
        },
        VTextArea: {
            persistentPlaceholder: true,
        },
    },
    theme: {
        defaultTheme: Theme.DARK,
        themes: { light, dark },
    },
});

export default vuetify;
