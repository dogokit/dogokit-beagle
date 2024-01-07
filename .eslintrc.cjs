/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: { project: true },
  root: true,
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "prettier",
    "plugin:tailwindcss/recommended",
  ],
  rules: {
    "import/consistent-type-specifier-style": ["warn", "prefer-inline"],
    "import/no-duplicates": ["warn", { "prefer-inline": true }],
    "require-await": ["warn"],
    "no-empty-pattern": "off",
    "node/no-process-env": "warn",
    "react/self-closing-comp": ["warn", { component: true, html: true }],
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-misused-promises": [2, { checksVoidReturn: { attributes: false } }],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
        disallowTypeAnnotations: true,
      },
    ],
  },
}
