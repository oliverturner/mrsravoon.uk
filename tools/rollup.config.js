import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";
// import autoPreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

/**
 * @param   {string}  [path]  slash-prefixed path relative to _site/lib
 * @return  {string}
 */
function dest(path) {
  return "_site/lib" + (path ? path : "");
}

export default {
  input: "client/js/main.js",
  output: {
    dev: !production,
    dir: dest(),
    format: "es",
  },
  plugins: [
    postcss({}),
    resolve({
      browser: true,
      dedupe: (importee) =>
        importee === "svelte" || importee.startsWith("svelte/"),
    }),
    commonjs(),

    svelte({
      // preprocess: autoPreprocess(),
      emitCss: true,
      css: function (css) {
        css.write(dest("/main.css"), true);
      },
    }),
    typescript({ sourceMap: !production }),
  ],
};
