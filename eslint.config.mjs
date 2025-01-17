import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from './.prettierrc.json'; // Assuming you have a Prettier config file

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      import: pluginImport,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginImport.configs.recommended.rules,
      ...pluginPrettier.configs.recommended.rules(prettierConfig),
      // Add any custom rules here
    },
  },
];
