import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Ignore tests and Jest setup during Next lint
      "**/*.test.*",
      "**/*.spec.*",
      "jest-setup.ts",
    ],
  },
  // Global rules relaxations suitable for this project
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  // File-specific overrides
  {
    files: ["src/lib/kendo-license.ts"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-console": "off",
    },
  },
];

export default eslintConfig;
