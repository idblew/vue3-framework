import { reactive, type ToRefs, toRefs, watchEffect } from "vue";
import type { ThemeDefinition } from "vuetify";

interface State {
    selectedTheme: Theme;
    theme: Theme;
}

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
    SYSTEM = "system",
}

export type ThemeStore = Readonly<ToRefs<State>>;

export default function useThemeStore(): ThemeStore {
    const state = reactive<State>({
        selectedTheme: Theme.SYSTEM,
        theme: Theme.DARK,
    });
    const queryDarkColourScheme: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    function systemThemeChangedEvent(event: MediaQueryListEvent) {
        state.theme = event.matches ? Theme.DARK : Theme.LIGHT;
    }

    watchEffect(() => {
        if (state.selectedTheme === Theme.SYSTEM) {
            state.theme = queryDarkColourScheme.matches ? Theme.DARK : Theme.LIGHT;
            queryDarkColourScheme.addEventListener("change", systemThemeChangedEvent);
        } else {
            queryDarkColourScheme.removeEventListener("change", systemThemeChangedEvent);
            state.theme = state.selectedTheme;
        }
    });

    return {
        ...toRefs(state),
    };
}
