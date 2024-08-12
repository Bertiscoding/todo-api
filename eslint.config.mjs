import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    pluginJs: {
      import: prettier,
      import: "@typescript-eslint"
    },
    extends: [
      "prettier",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    settings: {
      "import/resolver": {
        "typescript": {}
      }
    }
  },
  {languageOptions: { globals: globals.browser }},
  ...pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];