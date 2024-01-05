module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'react-refresh', 'simple-import-sort', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    'react/react-in-jsx-scope': 'off',
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
