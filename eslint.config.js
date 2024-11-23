import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

export default [
    {
        files: ["**/*.ts", "**/*.vue"],
        rules: {
            "@typescript-eslint/explicit-module-boundary-types": 0,
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "vue/script-setup-uses-vars": "error",
        },
    },
    {
        ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
    },
    ...pluginVue.configs["flat/recommended"],
    ...vueTsEslintConfig({
        // see: https://typescript-eslint.io/users/configs/#recommended-configurations
        extends: ["recommended"],
    }),
    skipFormatting,
];
