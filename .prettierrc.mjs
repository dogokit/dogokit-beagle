/** @type {import('prettier').Config & import("@ianvs/prettier-plugin-sort-imports").PrettierConfig & import('prettier-plugin-tailwindcss').options} */
export default {
  // changeable
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
  // common
  arrowParens: "avoid",
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: "auto",
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxSingleQuote: false,
  printWidth: 100,
  proseWrap: "always",
  quoteProps: "as-needed",
  requirePragma: false,
  singleAttributePerLine: false,
  // plugins
  importOrderTypeScriptVersion: "5.0.0",
  importOrder: [
    "", // Enforce a blank line after top of file comments
    "<BUILTIN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^[~]",
    "",
    "^[.]",
    "",
    ".css$",
  ],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-packagejson",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: ["**/*.md", "**/*.json"],
      options: { useTabs: false },
    },
  ],
}
