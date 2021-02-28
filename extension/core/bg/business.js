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

import * as config from "./config.js";
import * as autosave from "./autosave.js";
import * as requests from "./requests.js";
import * as tabs from "./tabs.js";
import * as ui from "./../../ui/bg/index.js";
import { injectScript } from "./../../index.js";

const ERROR_CONNECTION_ERROR_CHROMIUM = "Could not establish connection. Receiving end does not exist.";
const ERROR_CONNECTION_LOST_CHROMIUM = "The message port closed before a response was received.";
const ERROR_CONNECTION_LOST_GECKO = "Message manager disconnected";
const INJECT_SCRIPTS_STEP = 1;
const EXECUTE_SCRIPTS_STEP = 2;
const TASK_PENDING_STATE = "pending";
const TASK_PROCESSING_STATE = "processing";

const extensionScriptFiles = [
	"dist/protobuf.js",
	"dist/infobar.js",
	"dist/extension.js",
	"/extension/core/common/page-proto.js"
];

const tasks = [];
let currentTaskId = 0, maxParallelWorkers;

export {
	isSavingTab,
	saveTabs,
	saveUrls,
	saveSelectedLinks,
	cancelTab,
	cancelTask,
	cancelAllTasks,
	getTasksInfo,
	getTaskInfo,
	setCancelCallback,
	onSaveEnd,
	onInit,
	cancelTab as onTabRemoved
};

async function saveSelectedLinks(tab) {
	const tabOptions = { extensionScriptFiles, tabId: tab.id, tabIndex: tab.index };
	const scriptsInjected = await injectScript(tab.id, tabOptions);
	if (scriptsInjected) {
		const response = await tabs.sendMessage(tab.id, { method: "content.getSelectedLinks" });
		if (response.urls && response.urls.length) {
			await saveUrls(response.urls);
		}
	} else {
		ui.onForbiddenDomain(tab);
	}
}

async function saveUrls(urls, options = {}) {
	await initMaxParallelWorkers();
	await Promise.all(urls.map(async url => {
		const tabOptions = await config.getOptions(url);
		Object.keys(options).forEach(key => tabOptions[key] = options[key]);
		tabOptions.autoClose = true;
		tabOptions.extensionScriptFiles = extensionScriptFiles;
		if (tabOptions.passReferrerOnError) {
			await requests.enableReferrerOnError();
		}
		addTask({
			tab: { url },
			status: TASK_PENDING_STATE,
			options: tabOptions,
			method: "content.save"
		});
	}));
	runTasks();
}

async function saveTabs(tabs, options = {}) {
	await initMaxParallelWorkers();
	await Promise.all(tabs.map(async tab => {
		const tabId = tab.id;
		const tabOptions = await config.getOptions(tab.url);
		Object.keys(options).forEach(key => tabOptions[key] = options[key]);
		tabOptions.tabId = tabId;
		tabOptions.tabIndex = tab.index;
		tabOptions.extensionScriptFiles = extensionScriptFiles;
		if (tabOptions.passReferrerOnError) {
			await requests.enableReferrerOnError();
		}
		if (options.autoSave) {
			if (autosave.isEnabled(tab)) {
				const taskInfo = addTask({
					status: TASK_PROCESSING_STATE,
					tab,
					options: tabOptions,
					method: "content.autosave"
				});
				runTask(taskInfo);
			}
		} else {
			ui.onStart(tabId, INJECT_SCRIPTS_STEP);
			const scriptsInjected = await injectScript(tabId, tabOptions);
			if (scriptsInjected) {
				ui.onStart(tabId, EXECUTE_SCRIPTS_STEP);
				addTask({
					status: TASK_PENDING_STATE,
					tab,
					options: tabOptions,
					method: "content.save"
				});
			} else {
				ui.onForbiddenDomain(tab);
			}
		}
	}));
	runTasks();
}

function addTask(info) {
	const taskInfo = {
		id: currentTaskId,
		status: info.status,
		tab: info.tab,
		options: info.options,
		method: info.method,
		done: function () {
			tasks.splice(tasks.findIndex(taskInfo => taskInfo.id == this.id), 1);
			runTasks();
		}
	};
	tasks.push(taskInfo);
	currentTaskId++;
	return taskInfo;
}

async function initMaxParallelWorkers() {
	if (!maxParallelWorkers) {
		maxParallelWorkers = (await config.get()).maxParallelWorkers;
	}
}

function runTasks() {
	const processingCount = tasks.filter(taskInfo => taskInfo.status == TASK_PROCESSING_STATE).length;
	for (let index = 0; index < Math.min(tasks.length - processingCount, (maxParallelWorkers - processingCount)); index++) {
		const taskInfo = tasks.find(taskInfo => taskInfo.status == TASK_PENDING_STATE);
		if (taskInfo) {
			runTask(taskInfo);
		}
	}
}

async function runTask(taskInfo) {
	const taskId = taskInfo.id;
	taskInfo.status = TASK_PROCESSING_STATE;
	if (!taskInfo.tab.id) {
		let scriptsInjected;
		try {
			const tab = await tabs.createAndWait({ url: taskInfo.tab.url, active: false });
			taskInfo.tab.id = taskInfo.options.tabId = tab.id;
			taskInfo.tab.index = taskInfo.options.tabIndex = tab.index;
			ui.onStart(taskInfo.tab.id, INJECT_SCRIPTS_STEP);
			scriptsInjected = await injectScript(taskInfo.tab.id, taskInfo.options);
		} catch (tabId) {
			taskInfo.tab.id = tabId;
		}
		if (scriptsInjected) {
			ui.onStart(taskInfo.tab.id, EXECUTE_SCRIPTS_STEP);
		} else {
			taskInfo.done();
			return;
		}
	}
	taskInfo.options.taskId = taskId;
	try {
		await tabs.sendMessage(taskInfo.tab.id, { method: taskInfo.method, options: taskInfo.options });
	} catch (error) {
		if (error && (!error.message || !isIgnoredError(error))) {
			console.log(error.message ? error.message : error); // eslint-disable-line no-console
			ui.onError(taskInfo.tab.id);
			taskInfo.done();
		}
	}
}

function isIgnoredError(error) {
	return error.message == ERROR_CONNECTION_LOST_CHROMIUM ||
		error.message == ERROR_CONNECTION_ERROR_CHROMIUM ||
		error.message == ERROR_CONNECTION_LOST_GECKO;
}

function isSavingTab(tab) {
	return Boolean(tasks.find(taskInfo => taskInfo.tab.id == tab.id));
}

function onInit(tab) {
	cancelTab(tab.id);
}

function onSaveEnd(taskId) {
	const taskInfo = tasks.find(taskInfo => taskInfo.id == taskId);
	if (taskInfo) {
		if (taskInfo.options.autoClose && !taskInfo.cancelled) {
			tabs.remove(taskInfo.tab.id);
		}
		taskInfo.done();
	}
}

function setCancelCallback(taskId, cancelCallback) {
	const taskInfo = tasks.find(taskInfo => taskInfo.id == taskId);
	if (taskInfo) {
		taskInfo.cancel = cancelCallback;
	}
}

function cancelTab(tabId) {
	Array.from(tasks).filter(taskInfo => taskInfo.tab.id == tabId && !taskInfo.options.autoSave).forEach(cancel);
}

function cancelTask(taskId) {
	cancel(tasks.find(taskInfo => taskInfo.id == taskId));
}

function cancelAllTasks() {
	Array.from(tasks).forEach(cancel);
}

function getTasksInfo() {
	return tasks.map(mapTaskInfo);
}

function getTaskInfo(taskId) {
	return tasks.find(taskInfo => taskInfo.id == taskId);
}

function cancel(taskInfo) {
	const tabId = taskInfo.tab.id;
	taskInfo.cancelled = true;
	tabs.sendMessage(tabId, {
		method: "content.cancelSave",
		options: {
			loadDeferredImages: taskInfo.options.loadDeferredImages,
			loadDeferredImagesKeepZoomLevel: taskInfo.options.loadDeferredImagesKeepZoomLevel
		}
	});
	if (taskInfo.cancel) {
		taskInfo.cancel();
	}
	if (taskInfo.method == "content.autosave") {
		ui.onEnd(tabId, true);
	}
	ui.onCancelled(taskInfo.tab);
	taskInfo.done();
}

function mapTaskInfo(taskInfo) {
	return { id: taskInfo.id, tabId: taskInfo.tab.id, index: taskInfo.tab.index, url: taskInfo.tab.url, title: taskInfo.tab.title, cancelled: taskInfo.cancelled, status: taskInfo.status };
}
