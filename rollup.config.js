import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

const DEST = "_site/lib";

export default {
  input: "client/js/main.js",
  output: {
    dev: !production,
    dir: DEST,
    // format: "es",
  },
  plugins: [
    postcss({}),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    svelte({
      preprocess: sveltePreprocess(),
      emitCss: true,
      css: function (css) {
        css.write("_site/lib/main.css", true);
      },
    }),
    typescript({ sourceMap: !production }),
  ],
};
