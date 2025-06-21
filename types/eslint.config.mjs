import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import jsdoc from 'eslint-plugin-jsdoc';
const jsdocCfg = jsdoc.configs['flat/recommended-error'];
jsdocCfg.files = ["**/*.mjs"];
export default defineConfig([
    jsdocCfg,
    { files: ["**/*.mjs"], plugins: { js }, extends: ["js/recommended"] },
    { files: ["**/*.mjs"], languageOptions: { globals: globals.browser } },
]);
