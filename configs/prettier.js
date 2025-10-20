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
    import.meta.resolve('prettier-plugin-packagejson'),
    import.meta.resolve('prettier-plugin-jsdoc'),
    import.meta.resolve('prettier-plugin-sort-json'),
    import.meta.resolve('@ianvs/prettier-plugin-sort-imports'),
    import.meta.resolve('prettier-plugin-sh'),
  ],
  importOrder: [
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
    '^[.]', // relative imports
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.9.3',
  jsonRecursiveSort: true,
};
