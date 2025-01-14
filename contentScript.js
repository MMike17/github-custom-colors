// Invoked when we get on an itch.io/dashboard website
(() => {
	// Invoked when we receive a message
	chrome.runtime.onMessage.addListener((request, sender, response) => {
		if (request.greeting == "x") {
			//
		}
	});
})();