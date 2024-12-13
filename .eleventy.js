module.exports = function(eleventyConfig){
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addPassthroughCopy('./src/projects');
    eleventyConfig.addPassthroughCopy('./src/contact');
    eleventyConfig.addPassthroughCopy('./src/assets');
    
    eleventyConfig.addCollection("projects", function(collectionApi) {
        return collectionApi.getFilteredByTag("projects").sort((a, b) => {
            return parseInt(b.data.semester, 10) - parseInt(a.data.semester, 10); // Descending order
        });
    });

    return {
        dir: {
            input: "src",
            includes: "_includes",
            output: '_site',
        },
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
    }
}