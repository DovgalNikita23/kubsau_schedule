import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
// import pluginReact from 'eslint-plugin-react'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: { globals: globals.browser, parser: tsParser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'error', // Предупреждение при использовании console.log и других методов консоли
      quotes: ['error', 'single'], // Ошибка, если используются не одинарные кавычки
      indent: ['error', 2], // Ошибка, если отступ не равен 2 пробелам
      'react/prop-types': 'off', // Отключить проверку типов пропсов в React компонентах
      'no-unused-vars': 'warn', // Предупреждение о неиспользуемых переменных
      'sort-imports': [
        // Сортировка импортов в файлах
        'warn',
        {
          ignoreCase: true,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],
    },
  },
]
