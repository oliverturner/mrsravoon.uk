import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import sveltePreprocess from "svelte-preprocess";

const DEST = "_site/lib";
const isDev = Boolean(process.env.ROLLUP_WATCH) === true;

export default {
  input: "client/js/main.ts",
  output: {
    sourcemap: isDev,
    dir: DEST,
    format: "es",
  },
  plugins: [
    svelte({
      dev: isDev,
      css: (css) => {
        css.write(`${DEST}/component.css`, isDev);
      },
      preprocess: sveltePreprocess(),
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    typescript(),
  ],
};
