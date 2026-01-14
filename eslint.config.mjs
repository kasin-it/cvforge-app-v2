import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintReact from "@eslint-react/eslint-plugin";
import reactRefresh from "eslint-plugin-react-refresh";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  reactRefresh.configs.next,
  prettier,
  {
    ...eslintPluginUnicorn.configs.recommended,
    extends: [eslintReact.configs["recommended-typescript"]],
    rules: {
      ...eslintPluginUnicorn.configs.recommended.rules,
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-nested-ternary": "off",
      "react/no-unescaped-entities": "off",
      "unicorn/no-null": "off",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@eslint-react/no-nested-component-definitions": "warn",
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "no-console": "warn",
      "@eslint-react/no-unstable-context-value": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "ImportDeclaration[source.value='react'] > ImportDefaultSpecifier",
          message: "React import is unnecessary since version 17",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@eslint-react/naming-convention/context-name": "error",
      "@eslint-react/dom/no-missing-button-type": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "env",
          message:
            "Use validated env values from @/env instead of process.env.",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*", "./*"],
        },
      ],
    },
  },
  {
    files: ["next.config.ts"],
    rules: {
      "no-restricted-properties": "off",
    },
  },
  globalIgnores([".next/**", "components/ui", "next-env.d.ts", "env.ts"]),
]);

export default eslintConfig;
