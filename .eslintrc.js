module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  env: { node: true, jest: true },
  parserOptions: { project: ['./tsconfig.json'] },
  rules: {
    "@typescript-eslint/no-explicit-any": "warn"
  }
};

