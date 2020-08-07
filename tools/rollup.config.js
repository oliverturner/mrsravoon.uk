import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";

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
      emitCss: true,
      css: function (css) {
        css.write(dest("/main.css"), true);
      },
    }),
  ],
};
