import {shares} from './consts.js';

async function share({
	title = document.title,
	text = '',
	url = location.href
} = {}) {
	const size = 64;
	const template = document.getElementById('share-template').content;
	const container = document.body;
	shares.forEach(share => {
		const entry = template.cloneNode(true);
		const svg = entry.querySelector('svg');
		const link = entry.querySelector('a');
		svg.setAttribute('width', size);
		svg.setAttribute('height', size);
		link.title = `Share on ${share.title}`;
		link.href = getShareLink(share.url, title, text, url);
		entry.querySelector('use').setAttribute('xlink:href', share.icon);
		container.appendChild(entry);
	});
}

function getShareLink(href, title, text, url) {
	const shareURL = new URL(href);
	if (shareURL.searchParams.has('u')) {
		shareURL.searchParams.set('u', url);
	} else if (shareURL.searchParams.has('url')) {
		shareURL.searchParams.set('url', url);
	} else if (shareURL.searchParams.has('canonicalUrl')) {
		shareURL.searchParams.set('canonicalUrl', url);
	} else if (shareURL.searchParams.has('body')) {
		shareURL.searchParams.set('body', url);
	}

	if (shareURL.searchParams.has('text')) {
		shareURL.searchParams.set('text', title);
	} else if (shareURL.searchParams.has('title')) {
		shareURL.searchParams.set('title', title);
	} else if (shareURL.searchParams.has('su')) {
		shareURL.searchParams.set('su', title);
	}
	return shareURL.toString();
}

if (! ('share' in Navigator.prototype)) {
	Navigator.prototype.share = share;
}

window.addEventListener('load', navigator.share, {once: true});
