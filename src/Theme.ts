import { type Ref, ref } from "vue";
import type { ThemeDefinition } from "vuetify";

export const light: ThemeDefinition = {
    dark: false,
    colors: {
        // background: "#FFFFFF",
        // surface: "#f2f2f2",
        // primary: "#1867C0",
        // secondary: "#48A9A6",
    },
};

export const dark: ThemeDefinition = {
    dark: true,
    colors: {
        // background: "#121212",
        // surface: "#212121",
        // primary: "#2196F3",
        // secondary: "#54B6B2",
    },
};

export const enum Theme {
    LIGHT = "light",
    DARK = "dark",
}

export default function useTheme(): Ref<Theme> {
    const queryDarkColourScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const theme = ref(queryDarkColourScheme.matches ? Theme.DARK : Theme.LIGHT);
    queryDarkColourScheme.addEventListener("change", (e: MediaQueryListEvent) => {
        theme.value = e.matches ? Theme.DARK : Theme.LIGHT;
    });
    return theme;
}
