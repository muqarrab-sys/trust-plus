module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@modules': './src/modules',
          '@components': './src/components',
          '@persistence': './src/persistence',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@data': './src/data',
          '@src': './src',
        },
      },
    ],
  ],
};
