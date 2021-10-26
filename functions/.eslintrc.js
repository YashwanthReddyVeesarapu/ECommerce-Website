module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    indent: [1, "tab"],
    quotes: ["error", "double"],
    "no-tabs": 0,
    "max-len": 0,



  },
};
