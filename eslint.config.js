import js from "@eslint/js";
import next from "eslint-config-next-flat";
import pluginQuery from "@tanstack/eslint-plugin-query";

/** @type {import("eslint").Linter.Config[]} */
export default [
  { ignores: [".next/**"] },
  js.configs.recommended,
  next,
  ...pluginQuery.configs["flat/recommended"],
];
