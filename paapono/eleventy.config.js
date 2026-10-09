import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

import faviconsPlugin from "eleventy-plugin-gen-favicons";
import prettier from "prettier";
import htmlmin from "html-minifier-terser";
import { Case } from 'change-case-all';
import { TitleCaser } from '@danielhaim/titlecaser';
import * as util from 'util' // has no default export
import { inspect } from 'util' // or directly

export default function (eleventyConfig) {
	const isProduction = process.env.NODE_ENV === 'production';

	eleventyConfig.setInputDirectory('src');
	eleventyConfig.setOutputDirectory('dist');
	
	// folders/files that don't get formatted and are just copied directly
	eleventyConfig.addPassthroughCopy('src/css');

	// format html output properly
	if (isProduction) {
		// minify for production
		eleventyConfig.addTransform('htmlmin', function (content) {
			if ((this.page.outputPath || '').endsWith('.html')) {
				return htmlmin.minify(content, {
					useShortDoctype: true,
					removeComments: true,
					collapseWhitespace: true,
				});
			}
			return content;
		});
	} else {
		// prettify for development
		// https://bnijenhuis.nl/notes/adding-prettier-in-eleventy-using-transforms/
		eleventyConfig.addTransform("prettier", function (content) {
			if ((this.page.outputPath || "").endsWith(".html")) {
	
				let prettified = prettier.format(content, {
					bracketSameLine: true,
					printWidth: 80,
					parser: "html",
					tabWidth: 4
				});
				return prettified;
			}
	
			// If not an HTML output, return content as-is
			return content;
		});
	}
	
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

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

	// convert from kebab-case to Title Case
	eleventyConfig.addFilter("titleCase", function(word) { 
		return Case.title(Case.no(word));
	});

	eleventyConfig.addCollection("navMenu", function (collectionsApi) {
		return collectionsApi.getFilteredByGlob("**/*.md").sort(function (a, b) {
			return a.data.order - b.data.order; 
		});
	});
}

export const config = {
	// markdownTemplateEngine: 'webc',
	htmlTemplateEngine: 'webc',
};