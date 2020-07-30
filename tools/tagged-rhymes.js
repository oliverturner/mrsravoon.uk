const fs = require("fs");
const allRhymes = require("../__fixtures__/rhymes.json");

/** @namespace import('ravoon') ravoon */

/**
 * Save cleaned and sorted rhymes to disk
 *
 * @param   {string[]}  rhymes  e.g. ["gadroon", "bassoon"]
 * @param   {string}    path    e.g. "../__fixtures__/rhymes2.json"
 *
 * @return  void
 */
function wrangleRhymes(rhymes, path) {
  /**
   * @param {string} a
   * @param {string} b
   */
  const sorter = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());
  const cleaned = new Set(rhymes.slice().sort(sorter));
  const json = JSON.stringify([...cleaned]);

  fs.writeFile(path, json, (err) => {
    if (err) return console.log(err);
    console.log("Cleaned and sorted rhymes");
  });
}

/**
 * Create a dictionary of page objects keyed by fileSlug
 * Allows look-up of page records by rhyme
 *
 * @param   {Ravoon.TaggedSightings}  acc
 * @param   {Eleventy.Item}  post
 *
 * @return  {Ravoon.TaggedSightings}
 */
function getSightingsDict(acc, post) {
  if (post.data) {
    const { title, page } = post.data;
    const { url, fileSlug } = page;
    acc[fileSlug] = { title, url };
  }

  return acc;
}

/**
 * Create a dictionary of fileSlugs keyed by rhyme
 * These are rhymes that have been used
 *
 * @param   {Ravoon.TaggedRhymes}  acc
 * @param   {Eleventy.Item}  post
 *
 * @return  {Ravoon.TaggedRhymes}
 */
function getTaggedRhymes(acc, post) {
  if (post.data) {
    const { page, tags } = post.data;
    for (const tag of tags) {
      // Ignore the "post" tag, since all posts in this collection have it
      if (tag === "post") continue;

      if (!acc[tag]) {
        acc[tag] = [];
      }

      acc[tag].push(page.fileSlug);
    }
  }
  return acc;
}

/**
 * @param   {Eleventy.Collection}  collectionApi
 */
function getRhymes(collectionApi) {
  const posts = collectionApi.getFilteredByTag("post");
  const sightings = posts.reduce(getSightingsDict, {});
  const taggedRhymes = posts.reduce(getTaggedRhymes, {});

  return {
    sightings,
    taggedRhymes,
    allRhymes,
  };
}

module.exports = {
  wrangleRhymes,
  getRhymes,
};
