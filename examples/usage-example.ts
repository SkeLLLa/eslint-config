/**
 * Example of how to use \@no-esm/eslint-config in your project
 *
 * ESLint Configuration - Save this as `eslint.config.js` in your project root
 */
import eslintConfig from '@no-esm/eslint-config/eslint';

export default [
  // Use the shared configuration
  ...eslintConfig,

  // Add project-specific overrides
  {
    files: ['src/**/*.ts'],
    rules: {
      // Example: Allow console.log in development
      'no-console': 'warn',

      // Example: Customize TypeScript rules for your project
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Example: Different rules for test files
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      // Allow any types in tests
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow non-null assertions in tests
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // Example: Custom ignores for your project
  {
    ignores: ['build/**', 'public/**', '*.config.js'],
  },
];
