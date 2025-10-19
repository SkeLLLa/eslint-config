/**
 * Tests for the ESLint configuration
 */
import assert from 'node:assert';
import { describe, it } from 'node:test';
import config from '../configs/eslint.js';

// Cast config to any to avoid complex type issues
const configArray = config as unknown;

void describe('ESLint Configuration', async () => {
  await it('should export a valid ESLint config array', () => {
    assert.ok(Array.isArray(configArray), 'Config should be an array');
    assert.ok(configArray.length > 0, 'Config should not be empty');
  });

  await it('should contain configuration objects with expected properties', () => {
    const configs = configArray as any[];
    const hasIgnores = configs.some((cfg) => cfg.ignores);
    const hasRules = configs.some((cfg) => cfg.rules);
    const hasPlugins = configs.some((cfg) => cfg.plugins);

    assert.ok(hasIgnores, 'Config should contain ignore patterns');
    assert.ok(hasRules, 'Config should contain rules');
    assert.ok(hasPlugins, 'Config should contain plugins');
  });

  await it('should have proper ignore patterns', () => {
    const configs = configArray as any[];
    const ignoreConfig = configs.find((cfg) => cfg.ignores);
    assert.ok(ignoreConfig, 'Should have ignore configuration');

    const ignores = ignoreConfig.ignores;
    if (ignores) {
      assert.ok(
        ignores.includes('**/node_modules/'),
        'Should ignore node_modules',
      );
      assert.ok(ignores.includes('**/dist/'), 'Should ignore dist directory');
      assert.ok(
        ignores.includes('**/coverage/'),
        'Should ignore coverage directory',
      );
    }
  });

  await it('should have TypeScript-specific rules', () => {
    const configs = configArray as any[];
    const tsConfig = configs.find(
      (cfg) =>
        cfg.files &&
        Array.isArray(cfg.files) &&
        cfg.files.some(
          (file: string) => file === '**/*.ts' || file === '**/*.tsx',
        ) &&
        cfg.languageOptions?.parser,
    );

    assert.ok(tsConfig, 'Should have TypeScript-specific configuration');
    assert.ok(tsConfig.languageOptions.parser, 'Should have TypeScript parser');
  });

  await it('should have JavaScript-specific configuration', () => {
    const configs = configArray as any[];
    const jsConfig = configs.find(
      (cfg) =>
        cfg.files &&
        Array.isArray(cfg.files) &&
        cfg.files.some((file: string) => file.includes('**/*.js')),
    );

    assert.ok(jsConfig, 'Should have JavaScript-specific configuration');
  });

  await it('should include essential plugins', () => {
    const configs = configArray as any[];
    const pluginConfig = configs.find(
      (cfg) => cfg.plugins?.prettier && cfg.plugins.tsdoc,
    );

    assert.ok(
      pluginConfig,
      'Should have configuration with all essential plugins',
    );
    const plugins = pluginConfig.plugins;
    if (plugins) {
      assert.ok(
        plugins['@typescript-eslint'],
        'Should include TypeScript ESLint plugin',
      );
      assert.ok(plugins.prettier, 'Should include Prettier plugin');
      assert.ok(plugins.tsdoc, 'Should include TSDoc plugin');
    }
  });

  await it('should have proper rule configurations', () => {
    const configs = configArray as any[];
    const ruleConfig = configs.find(
      (cfg) => cfg.rules?.['prettier/prettier'] && cfg.rules['tsdoc/syntax'],
    );

    assert.ok(ruleConfig, 'Should have configuration with essential rules');
    const rules = ruleConfig.rules;
    if (rules) {
      assert.strictEqual(
        rules['prettier/prettier'],
        'error',
        'Prettier should be enforced as error',
      );
      assert.strictEqual(
        rules['tsdoc/syntax'],
        'error',
        'TSDoc syntax should be enforced',
      );
      assert.strictEqual(
        rules['import-x/no-unresolved'],
        'error',
        'Unresolved imports should be errors',
      );
    }
  });

  await it('should have proper language options for TypeScript files', () => {
    const configs = configArray as any[];
    const tsConfig = configs.find(
      (cfg) =>
        cfg.files &&
        Array.isArray(cfg.files) &&
        cfg.files.some((file: string) => file.includes('**/*.ts')) &&
        cfg.languageOptions?.parserOptions,
    );

    assert.ok(
      tsConfig,
      'Should have TypeScript configuration with parser options',
    );
    const parserOptions = tsConfig.languageOptions.parserOptions;
    if (parserOptions) {
      assert.ok(
        typeof parserOptions.project === 'string' &&
          parserOptions.project.endsWith('tsconfig.json'),
        'Should use resolved TypeScript project path',
      );
      assert.strictEqual(
        parserOptions.createDefaultProgram,
        true,
        'Should create default program',
      );
    }
  });

  await it('should have proper import resolver settings for TypeScript', () => {
    const configs = configArray as any[];
    const tsConfig = configs.find(
      (cfg) =>
        cfg.files &&
        Array.isArray(cfg.files) &&
        cfg.files.some((file: string) => file.includes('**/*.ts')) &&
        cfg.settings?.['import/resolver'],
    );

    assert.ok(
      tsConfig,
      'Should have TypeScript configuration with import resolver settings',
    );
    const importResolver = tsConfig.settings['import/resolver'];
    if (importResolver?.typescript) {
      assert.ok(
        typeof importResolver.typescript.project === 'string' &&
          importResolver.typescript.project.endsWith('tsconfig.json'),
        'Should have resolved TypeScript project path in import resolver',
      );
    }
  });
});
