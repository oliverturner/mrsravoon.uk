const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-es");
const htmlmin = require("html-minifier");
const slugify = require("slugify");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("lol", function (collectionApi) {
    return "lolololol";
  });

  eleventyConfig.addCollection("taggedRhymes", function (collectionApi) {
    const posts = collectionApi.getFilteredByTag("post");
    let oons = [];
    for (const post of posts) {
      console.log(post.data.tags, Array.isArray(post.data.tags));
      oons = oons.concat(post.data.tags);
    }

    // const p = posts[0];
    // const { title, page, tags } = p.data;
    // console.log({ title, page, tags });

    // console.log({ oons });
    // console.log({ oons:  });

    // return new Map();

    return [...new Set(oons.sort())];
  });

  // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Merge data instead of overriding
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let mdOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };
  const md = markdownIt(mdOptions);

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
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify JS
  eleventyConfig.addFilter("jsmin", function (code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

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

  let opts = {
    permalink: false,
  };

  eleventyConfig.setLibrary("md", md.use(markdownItAnchor, opts));

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
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
