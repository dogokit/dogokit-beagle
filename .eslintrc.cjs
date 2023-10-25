/** @type {import('eslint').Linter.Config} */
module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	parserOptions: { project: true },
	root: true,
	extends: [
		'@remix-run/eslint-config',
		'@remix-run/eslint-config/node',
		'prettier',
		'plugin:tailwindcss/recommended',
	],
	rules: {
		'no-empty-pattern': 'off',
		'node/no-process-env': 'warn',
		'@typescript-eslint/array-type': 'off',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{
				prefer: 'type-imports',
				fixStyle: 'inline-type-imports',
				disallowTypeAnnotations: true,
			},
		],
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/no-misused-promises': [
			2,
			{ checksVoidReturn: { attributes: false } },
		],
		'import/no-duplicates': ['warn', { 'prefer-inline': true }],
		'import/consistent-type-specifier-style': ['warn', 'prefer-inline'],
		// 'import/order': [
		// 	'warn',
		// 	{
		// 		alphabetize: { order: 'asc', caseInsensitive: true },
		// 		groups: [
		// 			'builtin',
		// 			'external',
		// 			'internal',
		// 			'parent',
		// 			'sibling',
		// 			'index',
		// 		],
		// 	},
		// ],
	},
}
