// import {shares} from './consts.js';
export function setOpts(form) {
	const obj = {};
	[...form.keys()].forEach(key => {
		obj[key] = form.get(key);
	});
	browser.storage.local.set(obj);
}
