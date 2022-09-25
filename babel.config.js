module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '^@/(.+)': './src/\\1',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts', '__tests__'],
};
