const { compileSassTargets } = require("../tools/compile-scss");

// Add SCSS compilation targets here
const targets = {
  main: "src/styles/main.scss",
};

// Create an object with the compiled CSS for each key in targets
module.exports = compileSassTargets(targets);
