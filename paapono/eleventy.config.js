import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import faviconsPlugin from "eleventy-plugin-gen-favicons";

export default function (eleventyConfig) {
	eleventyConfig.setInputDirectory('src');
	eleventyConfig.setOutputDirectory('dist');
	
	// folders/files that don't get formatted and are just copied directly
	eleventyConfig.addPassthroughCopy('src/css');
	
	eleventyConfig.addPlugin(faviconsPlugin, {'outputDir': './dist/icons/favicon', 'urlPath': '/icons/favicon'});

	eleventyConfig.addPlugin(pluginWebc, {
		// Glob to find no-import global components
		// This path is relative to the project-root!
		// The default value is shown:
		components: "src/_includes/components/**/*.webc",
	});

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		urlPath: "images",
		// outputDir: "images",
		
		// output image formats
		formats: ["webp", "jpg"],

		// output image widths
		widths: ["auto", 424, 1680, 2048],

		filenameFormat: function (id, src, width, format, options) {
			const extension = path.extname(src);
			const name = path.basename(src, extension);

			return `${name}-${width}w.${format}`;
		},

		// optional, attributes assigned on <img> nodes override these values
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			}
		},
	});

	// capitalize first letter of a word
	eleventyConfig.addFilter("titleCase", function(word) { 
		return String(word).charAt(0).toUpperCase() + String(word).slice(1);
	 });
}

export const config = {
	// markdownTemplateEngine: 'webc',
	htmlTemplateEngine: 'webc',
};