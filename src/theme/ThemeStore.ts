import { reactive, type ToRefs, toRefs, watchEffect } from "vue";
import type { ThemeDefinition } from "vuetify";
import type { Services } from "@/Services";
import type { Store } from "@/Store";

interface State {
    selectedTheme: Theme;
    theme: Theme;
}

export const light: ThemeDefinition = {
    dark: false,
    colors: {
        background: "#F5F5F5",
        surface: "#FFFFFF",
        // primary: "#3F51B5",
        // secondary: "#48A9A6",
    },
};

export const dark: ThemeDefinition = {
    dark: true,
    colors: {
        background: "#121212",
        surface: "#272727",
        // primary: "#3F51B5",
        // secondary: "#54B6B2",
    },
};

export const enum Theme {
    LIGHT = "light",
    DARK = "dark",
    SYSTEM = "system",
}

export type ThemeStore = Readonly<ToRefs<State>>;

export default function useThemeStore(_services: Services, _store: Store): ThemeStore {
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
