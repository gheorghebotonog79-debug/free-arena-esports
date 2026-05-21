import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dirnameCurrent = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: dirnameCurrent,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "out/**", "build/**", "dist/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
