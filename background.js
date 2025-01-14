let currentTab;

// Invoked when tabs are updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	currentTab = tab;
	//
});

// Invoked when we change tab
chrome.tabs.onActivated.addListener((activeInfo) => {
	GetCurrentTab((tab) => currentTab = tab);
});

// Invoked when we receive a message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.greeting = "x") {
		//	
	}

	sendResponse();
});

async function GetCurrentTab(onResult) {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	onResult(tab);
}