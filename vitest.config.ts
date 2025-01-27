import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            environment: "happy-dom",
            exclude: [...configDefaults.exclude, "e2e/**"],
            root: fileURLToPath(new URL("./", import.meta.url)),
            server: {
                deps: {
                    inline: ["vuetify"],
                },
            },
            coverage: {
                cleanOnRerun: true,
                exclude: [
                    "*.cjs",
                    "*.config.ts",
                    "*.d.ts",
                    "src/vueRouter.ts",
                    "src/vuetify.ts",
                    "tests/**",
                ],
                reporter: ["lcovonly", "text"],
            },
            reporters: ["junit", "verbose"],
            outputFile: {
                junit: "logs/junit.xml",
            },
        },
    }),
);
