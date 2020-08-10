/*eslint no-console: ["error", { allow: ["error", "info"] }] */

const postcss = require("postcss");
const autoprefixer = require("autoprefixer")();
const sass = require("sass");
const path = require("path");
const CleanCSS = require("clean-css");

const nodeEnv = process.env.NODE_ENV || "development";
const nodeEnvIsDevelopment = nodeEnv === "development";
const shouldMinifyCSS = !nodeEnvIsDevelopment;

// Create a visual error message to overlay the site
/**
 * @param   {Error}  error
 */
const CSSError = (error) => `/* Error compiling stylesheet: ${error} */`;

/**
 * @param   {string}  scss
 */
const compileScss = (scss) => {
  let result;
  try {
    result = sass.renderSync({
      file: path.join(__dirname, "../", scss),
      includePaths: ["node_modules"],
    });

    result = postcss([autoprefixer]).process(result.css);
  } catch (error) {
    result = error;
  }

  if (!result.css) {
    console.error("Error compiling stylesheet");
    console.info(result);
    return CSSError(result.message || "Error compiling stylesheet");
  }

  if (shouldMinifyCSS) {
    const minifiedCSS = new CleanCSS().minify(result.css.toString());

    if (!minifiedCSS.styles) {
      console.error("Error compiling stylesheet");
      console.info(minifiedCSS.errors);
      return CSSError(minifiedCSS.errors);
    }

    return minifiedCSS.styles;
  }

  return result.css;
};

/**
 * @param   {Record<string, string>}  targets
 *
 * @return  {Record<string, string>}
 */
function compileSassTargets(targets) {
  /**
   * @param   {Record<string, string>}  acc
   * @param   {string}  key
   *
   * @return  {Record<string, string>}
   */
  function compileTarget(acc, key) {
    acc[key] = compileScss(targets[key]);
    return acc;
  }
  return Object.keys(targets).reduce(compileTarget, {});
}

module.exports = {
  compileSassTargets,
};
