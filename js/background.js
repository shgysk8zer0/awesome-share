// import {share} from './share.js';
async function showIcon(tab) {
	if (typeof(tab) === 'number') {
		tab = await browser.tabs.get(tab);
	}
	const url = new URL('index.html', location.href);
	url.searchParams.set('url', tab.url);
	url.searchParams.set('title', tab.title);

	browser.pageAction.setPopup({
		tabId: tab.id || tab.tabId,
		popup: url.toString()
	});
	browser.pageAction.show(tab.id);
}

async function init() {
	const tabs = await browser.tabs.query({});
	tabs.forEach(showIcon);
}

browser.tabs.onUpdated.addListener(showIcon);
init();
