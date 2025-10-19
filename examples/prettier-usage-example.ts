/**
 * Example of how to use \@no-esm/eslint-config prettier configuration
 *
 * Prettier Configuration - Save this as `prettier.config.js` in your project root
 */
import prettierConfig from '@no-esm/eslint-config/prettier';

export default {
  ...prettierConfig,
  // Example: customize for your project
  printWidth: 100,
  tabWidth: 4,
};
