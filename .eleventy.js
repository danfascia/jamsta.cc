const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const readingTime = require('eleventy-plugin-reading-time');

module.exports = function(eleventyConfig) {
  
  /* Pass through - stop eleventy touching */
  eleventyConfig.addPassthroughCopy('src/images')

  /* 11ty Plugins */
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(readingTime);
  
  /* 11ty Filters */
  eleventyConfig.addFilter('excerpt', require("./11ty/11ty_excerpt.js") );
  eleventyConfig.addFilter('permalink', require("./11ty/11ty_permalink.js") );
  eleventyConfig.addFilter('readableDate', require("./11ty/11ty_readableDate.js") );

  /* 11ty Collections */
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("./src/_posts/*.md");
  });

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  }
}
