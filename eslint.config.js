import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import pluginQuery from "@tanstack/eslint-plugin-query";

/** @type {import("eslint").Linter.Config[]} */
export default defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  ...nextVitals,
  ...pluginQuery.configs["flat/recommended"],
]);
