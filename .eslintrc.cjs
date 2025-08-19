module.exports = {
    root: true,
    env: { es2023: true, node: true },
    extends: ['eslint:recommended'],
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // simple camelCase + disallow 1-char identifiers except i/j
      'id-length': ['warn', { min: 2, exceptions: ['i', 'j'] }],
      'camelcase': ['warn', { properties: 'never', ignoreDestructuring: true }]
    },
    ignorePatterns: ['allure-results/', 'allure-report/', 'node_modules/']
  };  