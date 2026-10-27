import path from 'node:path';

export default {
    permalink: function getLink(data) {
        // remove content directory from url
        let url = data.page.filePathStem.split(path.sep);
        url = path.join(...url.slice(2, url.length - 1));
        url = path.format({
            dir: url,
            base: "index.html"
        });
        return data.permalink || url;
    },
    title: function getTitle(data) {
        return data.title || this.titleCase(data.page.fileSlug);
    },
    layout: data => {
            return data.layout || "layouts/default.webc"
    },
	eleventyNavigation: {
		order: data => {
            return data.order;
        },
        title: data => {
            return data.title;
        },
        key: data => {
            return data.page.fileSlug;
        },
        parent: data => {
            // Get URL directory fragments
            const urlParts = data.page.url.split(path.sep);
            // Taking all but first and last two leaves us with the parent directory path
            const parent = urlParts[urlParts.length - 3];
            return parent;
        }
	},
};