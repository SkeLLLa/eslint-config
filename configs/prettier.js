/**
 * Shared Prettier configuration
 *
 * This configuration provides sensible defaults for code formatting
 * with additional plugins for enhanced functionality.
 */
export default {
  $schema: 'http://json.schemastore.org/prettierrc',
  trailingComma: 'all',
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 80,
  plugins: [
    'prettier-plugin-packagejson',
    'prettier-plugin-jsdoc',
    'prettier-plugin-sort-json',
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-sh',
  ],
  importOrder: [
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
    '^[.]', // relative imports
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.4.2',
  jsonRecursiveSort: true,
};
