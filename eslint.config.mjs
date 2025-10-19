import sharedConfig from './configs/eslint.js';

export default [
  ...sharedConfig,

  // Override TypeScript configuration for this project
  // {
  //   files: ['**/*.ts', '**/*.tsx'],
  //   languageOptions: {
  //     parser: tsParser,
  //     parserOptions: {
  //       project: 'tsconfig.json',
  //       tsconfigRootDir: import.meta.dirname,
  //       createDefaultProgram: true,
  //     },
  //     globals: {
  //       ...globals.node,
  //     },
  //   },
  // },

  // Examples folder: avoid type-checked diagnostics for imports that only
  // exist in consumer environments (like '@no-esm/eslint-config/prettier').
  // This relaxes type-aware rules and disables unresolved-import checks for
  // files under `examples/` so editor/CI won't report TS2307 from these demo
  // files.
  {
    files: ['examples/**/*.*'],
    // Turn off rules that can surface missing-module/type errors in examples
    rules: {
      'import-x/no-unresolved': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
    languageOptions: {
      // Avoid requiring a tsconfig project for these files so the parser
      // won't surface TypeScript type-checking diagnostics (TS2307).
      parserOptions: {
        project: undefined,
      },
    },
  },
];
