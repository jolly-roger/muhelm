module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb-base",
  "globals": {
    "document": true,
    "MutationObserver": true
  },
  "rules": {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true
      }
    ]
  }
};