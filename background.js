let currentTab;

// Invoked when tabs are updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	currentTab = tab;
	TriggerRepaint();
});

// Invoked when we change tab
chrome.tabs.onActivated.addListener((activeInfo) => {
	GetCurrentTab((tab) => {
		currentTab = tab;
		TriggerRepaint();
	});
});

// Invoked when we receive a message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message = "trigger-repaint")
		TriggerRepaint();
});

function TriggerRepaint() {
	if (currentTab && currentTab.url.includes("github.com/"))
		chrome.tabs.sendMessage(currentTab.id, "Repaint");
}

async function GetCurrentTab(onResult) {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	onResult(tab);
}