import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import-x";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strict,
  prettier,
  {
    plugins: {
      "import-x": importPlugin,
    },
    rules: {
      // -- Module boundary enforcement (HARNESS: teaches agents correct imports) --
      "import-x/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/modules/*/!(index).{ts,tsx}",
              from: "./src/modules/!(${1})/!(index).{ts,tsx}",
              message:
                "HARNESS FIX: Do not import internal files from another module. " +
                "Import from the module's public API instead: " +
                "import { thing } from '@/modules/other-module'. " +
                "If the export doesn't exist, add it to that module's index.ts. " +
                "See ARCHITECTURE.md section 'Module boundaries'.",
            },
            {
              target: "./src/app/**/*.{ts,tsx}",
              from: "./src/modules/*/services/**",
              message:
                "HARNESS FIX: UI components must not import domain services directly. " +
                "Use server actions (src/modules/*/actions/) or route handlers to call domain logic. " +
                "See ARCHITECTURE.md section 'UI ↔ domain separation'.",
            },
            {
              // Cross-cutting concerns must enter through src/lib/providers.
              // Providers themselves must not depend on modules (forward-only edge).
              target: "./src/lib/providers/**/*.{ts,tsx}",
              from: "./src/modules/**",
              message:
                "HARNESS FIX: src/lib/providers is the cross-cutting entry point — it must not " +
                "depend on any module. If a provider needs module behavior, invert the dependency: " +
                "expose a provider interface and let the module call it. " +
                "See ARCHITECTURE.md section 'Cross-cutting concerns'.",
            },
          ],
        },
      ],

      // -- Type safety (HARNESS: prevents common agent mistakes) --
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // -- Structured logging only (HARNESS: MANIFESTO §9 — rules that matter are errors) --
      // console.* is banned in application code. The logger in src/lib/logger allows
      // controlled console usage internally via `eslint-disable-next-line`.
      "no-console": "error",

      // -- Import hygiene --
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
      "import-x/no-duplicates": "error",
    },
    settings: {
      "import-x/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
  {
    // E2E tests run in Playwright's Node context; allow console for test diagnostics.
    files: ["e2e/**/*.{ts,tsx}"],
    rules: {
      "no-console": "off",
    },
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "*.config.*",
    ],
  }
);
