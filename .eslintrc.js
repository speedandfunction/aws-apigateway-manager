module.exports = {
    extends: 'airbnb-base',
    env: {
        node: true
    },
    rules: {
      'indent': ['error', 2],
      'object-curly-spacing': ['error', 'never'],
      'no-use-before-define': ['error', {functions: false}],
      'arrow-parens': ['error', 'always'],
      'class-methods-use-this': 'off',
      'no-empty-function': 'off',
      'no-underscore-dangle': 'off',
      'no-console': 'off',
    },
};
