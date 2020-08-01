const fs = require("fs");
const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-es");
const htmlmin = require("html-minifier");
const slugify = require("slugify").default;
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { getRhymes } = require("./tools/rhymes.js");

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === "production";

/* Markdown Plugins */
let mdAnchor = require("markdown-it-anchor");
let mdAnchorOpts = {
  permalink: false,
};

let markdownIt = require("markdown-it");
const md = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
});
const mdLib = md.use(mdAnchor, mdAnchorOpts);

/**
 * @param   {Eleventy.Config}  eleventyConfig  [eleventyConfig description]
 *
 * @return  {Eleventy.UserConfig}
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("taggedRhymes", getRhymes);

  // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Merge data instead of overriding
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Inline Markdown rendering
  eleventyConfig.addFilter("md", (text) => {
    return md.render(text);
  });

  // Inline Markdown rendering
  eleventyConfig.addFilter("json", (data) => {
    return JSON.stringify(data, null, 2);
  });

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function (code) {
    if (isProduction) {
      return new CleanCSS({}).minify(code).styles;
    }

    return code;
  });

  // Minify JS
  eleventyConfig.addFilter("jsmin", function (code) {
    if (isProduction) {
      let minified = UglifyJS.minify(code);
      if (minified.error) {
        console.log("UglifyJS error: ", minified.error);
        return code;
      }
      return minified.code;
    }

    return code;
  });

  if (isProduction) {
    // Minify HTML output
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
      if (outputPath.indexOf(".html") > -1) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        });
        return minified;
      }
      return content;
    });
  }

  // Serve a 404 page in development
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (_err, bs) {
        bs.addMiddleware("*", (_req, res) => {
          const content_404 = fs.readFileSync("_site/404.html");
          // Provides the 404 content without redirect.
          res.write(content_404);
          // Add 404 http status code in request header.
          // res.writeHead(404, { "Content-Type": "text/html" });
          res.writeHead(404);
          res.end();
        });
      },
    },
  });

  eleventyConfig.addFilter("slug", function (str) {
    return slugify(str, {
      lower: true,
      remove: /[*+~.·,()'"`´%!?¿:@…]/g,
    });
  });

  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("_includes/assets/");

  eleventyConfig.setLibrary("md", mdLib);

  eleventyConfig.addWatchTarget("./src/");

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      // input: ".",
      // includes: "_includes",
      // data: "_data",
      // output: "_site",
      input: "src",
    },
  };
};
