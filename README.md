# @no-esm/lint-config

A comprehensive, opinionated ESLint configuration for TypeScript projects with Prettier integration.

## Features

- 🎯 **TypeScript-first**: Built with TypeScript projects in mind
- 🔧 **Strict rules**: Includes ESLint recommended + TypeScript strict configurations
- 🎨 **Prettier integration**: Automatic code formatting with conflict resolution
- 📦 **Import validation**: Smart import/export validation with TypeScript support
- 📚 **TSDoc support**: Validates TypeScript documentation comments
- ⚡ **Modern ESLint**: Uses the new flat config format (ESLint 9+)

## Installation

```bash
npm install --save-dev @no-esm/lint-config eslint prettier typescript
# or
pnpm add -D @no-esm/lint-config eslint prettier typescript
# or
yarn add -D @no-esm/lint-config eslint prettier typescript
```

## Usage

### ESLint Configuration

Create an `eslint.config.js` file in your project root:

```javascript
// Option 1: Import the main config (default export)
import sharedConfig from '@no-esm/lint-config';

export default [
  ...sharedConfig,
  // Add your custom rules here if needed
  {
    rules: {
      // Your project-specific overrides
    },
  },
];
```

```javascript
// Option 2: Import the eslint config explicitly
import eslintConfig from '@no-esm/lint-config/eslint';

export default [
  ...eslintConfig,
  // Add your custom rules here if needed
  {
    rules: {
      // Your project-specific overrides
    },
  },
];
```

### Prettier Configuration

Create a `prettier.config.js` file in your project root:

```javascript
import prettierConfig from '@no-esm/lint-config/prettier';

export default prettierConfig;
```

Or extend it with your own settings:

```javascript
import prettierConfig from '@no-esm/lint-config/prettier';

export default {
  ...prettierConfig,
  // Your custom overrides
  printWidth: 100,
};
```

### With custom configurations

```javascript
import sharedConfig from '@no-esm/lint-config';

export default [
  ...sharedConfig,
  {
    // Override for specific file patterns
    files: ['src/legacy/**/*.js'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    // Additional ignores
    ignores: ['build/**', 'public/**'],
  },
];
```

## What's included

This configuration includes:

- **ESLint recommended rules**
- **TypeScript ESLint strict and stylistic rules**
- **Import/export validation** with TypeScript resolver
- **Prettier integration** with automatic formatting
- **TSDoc validation** for documentation comments
- **Sensible defaults** for Node.js environments

## Peer Dependencies

Make sure you have these installed in your project:

- `eslint` ^9.0.0
- `prettier` ^3.0.0
- `typescript` ^5.0.0

## License

MIT

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/SkeLLLa/eslint-config).
