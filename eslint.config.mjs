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
    rules: {
      // Allow any types for mock data and development
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow unused vars in development 
      "@typescript-eslint/no-unused-vars": "warn",
      // Allow unescaped entities for better readability
      "react/no-unescaped-entities": "warn",
    },
  },
];

export default eslintConfig;
