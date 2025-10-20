import eslint from '@eslint/js';
import { flatConfigs as importX } from 'eslint-plugin-import-x';
import prettier from 'eslint-plugin-prettier';
import tsdoc from 'eslint-plugin-tsdoc';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import {
  configs as tsConfigs,
  parser as tsParser,
  plugin as tsPlugin,
} from 'typescript-eslint';

const project = 'tsconfig.json';
const tsconfigRootDir = process.cwd();

/**
 * Shared ESLint configuration for TypeScript projects
 *
 * This configuration includes:
 * - ESLint recommended rules
 * - TypeScript ESLint strict and stylistic rules
 * - Import/export validation
 * - Prettier integration
 * - TSDoc validation
 */
const config = /** @type import('eslint/rules') */ (
  defineConfig([
    // Global ignores
    {
      ignores: [
        '**/logs/',
        '**/coverage/',
        '**/node_modules/',
        '**/.vscode/',
        '**/*.xxx.*',
        '**/dist/',
        '**/build/',
      ],
    },

    // Base ESLint recommended configuration
    eslint.configs.recommended,

    // TypeScript ESLint configurations (non-type-checked applied globally)
    ...tsConfigs.strict,
    ...tsConfigs.stylistic,

    // Import plugin configurations
    importX.recommended,
    importX.typescript,

    // TypeScript-specific configuration (type-checked rules only for TS files)
    {
      files: ['**/*.ts', '**/*.tsx'],
      // non-type-checked rules and settings for TS files
      plugins: {
        '@typescript-eslint': tsPlugin,
        prettier,
        tsdoc,
      },
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          project,
          tsconfigRootDir,
          createDefaultProgram: true,
        },
        globals: {
          ...globals.node,
        },
      },
      settings: {
        'import/resolver': {
          typescript: {
            project,
          },
        },
      },
      rules: {
        'import-x/no-unresolved': 'error',
        'new-cap': [
          'error',
          {
            capIsNewExceptions: ['ObjectId', 'Fastify'],
            capIsNewExceptionPattern: '^Type\\.',
          },
        ],
        'tsdoc/syntax': 'error',
        'prettier/prettier': 'error',
        '@typescript-eslint/consistent-type-exports': 'error',
      },
    },

    // Include the type-checked config entries, but scope each to TypeScript files
    ...tsConfigs.strictTypeChecked.map((cfg) => ({
      files: ['**/*.ts', '**/*.tsx'],
      ...cfg,
    })),
    ...tsConfigs.stylisticTypeChecked.map((cfg) => ({
      files: ['**/*.ts', '**/*.tsx'],
      ...cfg,
    })),
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
      },
    },
    // JavaScript-specific configuration
    {
      files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
      ...tsConfigs.disableTypeChecked,
      languageOptions: {
        globals: {
          ...globals.node,
        },
      },
      rules: {
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
        '@typescript-eslint/no-require-imports': 'off',
      },
    },

    // Relax some strict rules for test files
    {
      files: ['test/**/*.ts', 'test/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ])
);

export default config;
