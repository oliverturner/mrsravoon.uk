module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  overrides: [
    {
      files: ["**/*.test.js"],
      env: {
        jest: true,
      },
    },
  ],
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018,
  },
  extends: ["eslint:recommended", "plugin:jest/recommended"],
  globals: {
    CMS: true,
    h: true,
    createClass: true,
  },
};
