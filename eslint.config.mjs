import eslintJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config({
  extends: [
    eslintJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    eslintPluginPrettierRecommended,
  ],
  files: ['lib/**/*.{ts,json}'],
  ignores: ['dist', 'node_modules', 'coverage'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.node,
  },
  plugins: {},
  rules: {
    'prettier/prettier': 'warn', // 默认为 error
    'prefer-arrow-callback': 'off',
  },
})
