// Functionality for language-oriented actions in I Support Jolla

module isupportjolla.lang {

	// GetDirection
	// This function gets the direction used in the document
	export function GetDirection(): string {
		return document.body.getAttribute("dir"); // Return the dir attribute from body
	}

	// GetLanguage
	// This function gets the current language of the document
	export function GetLanguage(): string {
		return document.querySelector("html").getAttribute("lang"); // Get the lang attribute value from the html Element
	}

	// PropagateLanguageBar
	// This function will propagate the language bar with links to Languages
	export function PropagateLanguageBar() {
		if ((typeof isupportjolla.Config.Languages == "string") && (isupportjolla.Config.Languages.length !== 0)) { // If there are languages defined
			var languageBar = document.querySelector('header > div[data-isupportjolla-component="navigation"][data-isupportjolla-type="language"]'); // Get the language bar Element
			var languagesArray = isupportjolla.Config.Languages.split(","); // Split the comma-separated languages up

			var pageURL: string = document.location.href; // Set pageURL to the entire location href of the document
			var rootURL: string = pageURL.substr(0, pageURL.lastIndexOf(isupportjolla.lang.GetLanguage())); // Set the root URL to the current href, being a substring of the last index of the language in use
			var htmlFile: string = document.location.href.substr(pageURL.lastIndexOf("/")); // Set the htmlFile to the last index of / + 1 (so we only get the page, INCLUDING the end /)

			for (var language of languagesArray) { // For each language in languagesArray
				var newLink = document.createElement("a"); // Create a new link Element
				newLink.href = rootURL + language + htmlFile; // Set to the rootURL, plus the language, plus /page
				newLink.textContent = language; // Set the newLink.textContent to the languageBar
				languageBar.appendChild(newLink); // Append the newLink
			}
		}
	}
}