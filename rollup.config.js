import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";
import sveltePreprocess from "svelte-preprocess";

const DEST = "_site/lib";
const production = !process.env.ROLLUP_WATCH;

export default {
  input: "client/js/main.ts",
  output: {
    dev: !production,
    dir: DEST,
    format: "es",
  },
  sourcemap: !production,
  plugins: [
    postcss({}),
    resolve({
      browser: true,
      dedupe: (importee) =>
        importee === "svelte" || importee.startsWith("svelte/"),
    }),
    commonjs(),

    svelte({
      preprocess: sveltePreprocess(),
      emitCss: true,
      css: function (css) {
        css.write(`${DEST}/main.css`, true);
      },
    }),
    typescript(),
  ],
};
