import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginWebc from "@11ty/eleventy-plugin-webc";
// import path from "node:path";
// import fs from "node:fs";

export default function (eleventyConfig) {
	eleventyConfig.setInputDirectory('src');
	eleventyConfig.setOutputDirectory('dist');
	
	// folders/files that don't get formatted and are just copied directly
	eleventyConfig.addPassthroughCopy('src/css');
	eleventyConfig.addPassthroughCopy('src/icons/favicon/**');

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
}

export const config = {
	markdownTemplateEngine: 'webc',
	htmlTemplateEngine: 'webc',
};