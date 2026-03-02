import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
import perfectionist from 'eslint-plugin-perfectionist'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: { globals: globals.browser, parser: tsParser },
    plugins: {
      perfectionist,
    },
    rules: {
      'no-console': 'error',
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'react/prop-types': 'off',
      'no-unused-vars': 'warn',
      'sort-imports': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'line-length',
          order: 'asc',
        },
      ],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
