/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
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
  printWidth: 80,
  proseWrap: "always",
  quoteProps: "as-needed",
  requirePragma: false,
  singleAttributePerLine: false,
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: ["**/*.md", "**/*.json"],
      options: { useTabs: false },
    },
  ],
}
