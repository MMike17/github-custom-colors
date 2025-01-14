// Invoked when we open the popup
document.addEventListener("DOMContentLoaded", DrawPopup);

function DrawPopup() {
	GetCurrentURL((url) => {
		if (!url.includes("github.com")) {
			DisplayInPopup("<div class='title'>Test</div>");
			return;
		}
	});
}

function DisplayInPopup(message) {
	const popup = document.getElementsByClassName("container")[0];
	popup.innerHTML = message;
}