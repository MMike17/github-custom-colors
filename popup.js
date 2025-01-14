import { GetCurrentScheme, GetCurrentTab, GetCurrentURL, GetScemeColors, GetScemeName, IsRightPage, maxSceheme, SaveScheme } from "./utils.js";

const exampleCount = 5;

// Invoked when we open the popup
document.addEventListener("DOMContentLoaded", DrawPopup());

function DrawPopup() {
	GetCurrentURL(url => {
		switch (IsRightPage(url)) {
			case 1:
				DisplayInPopup("<div class='title'>Go to github.com to manage your color schemes.</div>");
				return;
			case 2:
				DisplayInPopup("<div class=\"title\">This extension only works on user pages.</div>");
				return;
		}

		GetCurrentTab(tab => {
			chrome.tabs.sendMessage(tab.id, "Check-page", function (check) {
				if (!check)
					DisplayInPopup("<div class=\"title\">This extension only works on the overview section.</div>");
				else {
					GetCurrentScheme((currentScheme) => {
						let display = "<div class='title'>Color schemes</div><div class=\"schemes-holder\">";

						for (let i = 0; i < maxSceheme; i++) {
							const name = GetScemeName(i);
							const colors = GetScemeColors(i, exampleCount);
							display += GetSchemeDisplay(name, colors, i == currentScheme);
						}

						DisplayInPopup(display + "</div>");

						// register click events
						const buttons = document.getElementsByClassName("scheme");

						for (let i = 0; i < maxSceheme; i++) {
							buttons[i].addEventListener("click", () => {
								SaveScheme(i);
								chrome.runtime.sendMessage("trigger-repaint");
								DrawPopup();
							});
						}
					});
				}
			});
		});

		return;
	});
}

function DisplayInPopup(message) {
	const popup = document.getElementsByClassName("container")[0];
	popup.innerHTML = message;
}

function GetSchemeDisplay(name, colors, isSelected) {
	// inject holder and selected style
	const selectedText = isSelected ? "selected" : "";
	let display = "<div class='scheme " + selectedText + "' style='";

	// inject colors
	for (let i = 0; i < exampleCount; i++)
		display += "--color" + (i + 1) + ": " + colors[i] + ";";

	// close color and add scheme name
	display += "'><div class='scheme-name " + selectedText + "'><p>" + name + "</p></div></div>";
	return display;
}