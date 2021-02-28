/*
 * Copyright 2010-2020 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 * 
 * This file is part of SingleFile.
 *
 *   The code in this file is free software: you can redistribute it and/or 
 *   modify it under the terms of the GNU Affero General Public License 
 *   (GNU AGPL) as published by the Free Software Foundation, either version 3
 *   of the License, or (at your option) any later version.
 * 
 *   The code in this file is distributed in the hope that it will be useful, 
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of 
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero 
 *   General Public License for more details.
 *
 *   As additional permission under GNU AGPL version 3 section 7, you may 
 *   distribute UNMODIFIED VERSIONS OF THIS file without the copy of the GNU 
 *   AGPL normally required by section 4, provided you include this license 
 *   notice and a URL through which recipients can access the Corresponding 
 *   Source.
 */

/* global browser, setTimeout, clearTimeout */

"use strict";

const timeouts = new Map();

browser.runtime.onMessage.addListener((message, sender) => {
	if (message.method == "singlefile.lazyTimeout.setTimeout") {
		let tabTimeouts = timeouts.get(sender.tab.id);
		if (tabTimeouts) {
			const previousTimeoutId = tabTimeouts.get(message.type);
			if (previousTimeoutId) {
				clearTimeout(previousTimeoutId);
			}
		}
		const timeoutId = setTimeout(async () => {
			try {
				const tabTimeouts = timeouts.get(sender.tab.id);
				if (tabTimeouts) {
					deleteTimeout(tabTimeouts, sender.tab.id, message.type);
				}
				await browser.tabs.sendMessage(sender.tab.id, { method: "singlefile.lazyTimeout.onTimeout", type: message.type });
			} catch (error) {
				// ignored
			}
		}, message.delay);
		if (!tabTimeouts) {
			tabTimeouts = new Map();
			timeouts.set(sender.tab.id, tabTimeouts);
		}
		tabTimeouts.set(message.type, timeoutId);
		return Promise.resolve({});
	}
	if (message.method == "singlefile.lazyTimeout.clearTimeout") {
		let tabTimeouts = timeouts.get(sender.tab.id);
		if (tabTimeouts) {
			const timeoutId = tabTimeouts.get(message.type);
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			deleteTimeout(tabTimeouts, sender.tab.id, message.type);
		}
		return Promise.resolve({});
	}
});

browser.tabs.onRemoved.addListener(tabId => timeouts.delete(tabId));

function deleteTimeout(tabTimeouts, tabId, type) {
	tabTimeouts.delete(type);
	if (!tabTimeouts.size) {
		timeouts.delete(tabId);
	}
}