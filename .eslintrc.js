module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/flowtype', 'prettier/react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_embedded'],
        allowAfterThis: true,
      },
    ],
    'constructor-super': 'off',
    'class-methods-use-this': 'off',
    'no-use-before-define': 'off',
    'react/sort-comp': [
      1,
      {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
  },
};
