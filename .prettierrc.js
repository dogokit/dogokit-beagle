/** @type {import('prettier').Options} */
export default {
	// changeable
	semi: false,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
	// common
	arrowParens: 'avoid',
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: 'auto',
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	insertPragma: false,
	jsxSingleQuote: false,
	printWidth: 80,
	proseWrap: 'always',
	quoteProps: 'as-needed',
	requirePragma: false,
	singleAttributePerLine: false,
	overrides: [
		{
			files: ['**/*.json'],
			options: { useTabs: false },
		},
	],
	plugins: ['prettier-plugin-tailwindcss'],
}
