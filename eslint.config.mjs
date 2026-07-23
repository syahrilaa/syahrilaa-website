import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginTailwind from 'eslint-plugin-tailwindcss';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';

const SOURCE_FILES = ['**/*.{js,cjs,mjs,jsx,ts,tsx,mts,cts}'];
const TS_FILES = ['**/*.{ts,tsx,mts,cts}'];
const IGNORES = [
  '.next/**',
  'out/**',
  'build/**',
  'dist/**',
  'coverage/**',
  'node_modules/**',
  'next-env.d.ts',
  '*.config.js',
  '*.config.cjs',
];

const config = defineConfig([
  globalIgnores(IGNORES),
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },
  ...(Array.isArray(nextVitals) ? nextVitals : [nextVitals]),
  ...(Array.isArray(nextTs) ? nextTs : [nextTs]),
  {
    ...eslintPluginTailwind.configs.recommended,
    settings: {
      tailwindcss: {
        cssConfigPath: 'app/globals.css',
        functions: ['classnames', 'clsx', 'ctl', 'cva', 'tv', 'classes'],
        ignoredKeys: ['defaultVariants', 'compoundVariants', 'compoundSlots'],
      },
    },
    rules: {
      ...eslintPluginTailwind.configs.recommended.rules,
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/enforces-negative-arbitrary-values': 'error',
      'tailwindcss/enforces-shorthand': 'error',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-unnecessary-arbitrary-value': 'error',
    },
  },
  {
    files: SOURCE_FILES,
    plugins: {
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'import/first': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-self-import': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type', 'unknown'],
          'newlines-between': 'never',
          pathGroups: [
            {
              group: 'internal',
              pattern: '~/**',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['type'],
          warnOnUnassignedImports: true,
        },
      ],
      'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
      'no-duplicate-imports': 'off',
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-const': ['error', { destructuring: 'all' }],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'none',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: TS_FILES,
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },
  prettier,
]);

export default config;
