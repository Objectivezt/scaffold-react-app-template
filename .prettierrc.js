module.exports = {
  singleQuote: true,
  endOfLint: 'auto',
  jsxBracketSameLine: true,
  printWidth: 100,
  proseWrap: 'never',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json'
      }
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html'
      }
    }
  ]
};
