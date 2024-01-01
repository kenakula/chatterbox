module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^\\w'],
          ['^@\\w'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^\\u0000'],
        ],
      },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {"allowExpressions": true}
    ],
    'semi': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': 'error',
    'quotes': ['error', 'single', {'allowTemplateLiterals': true}],
    'object-curly-spacing': ['warn', 'always']
  },
}
