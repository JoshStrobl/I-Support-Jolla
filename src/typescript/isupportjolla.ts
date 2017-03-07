// I Support Jolla - Typescript
/// <reference path="errors.ts" />
/// <reference path="interfaces.ts" />
/// <reference path="lang.ts" />
/// <reference path="twitter.ts" />

module isupportjolla {

	export var Config: ConfigOptions; // Define Config as a ConfigOptions interface
	export var PrimaryView: Element; // PrimaryView is the HTMLElement of the primary content section
	export var SecondaryView: Element; // SecondaryView is the HTMLElement of the secondary view

	// Init
	// This function is responsible for the appropriate initialization of aspects of the page
	export function Init(options?: ConfigOptions) {
		isupportjolla.PrimaryView = document.querySelector('div[data-isupportjolla="view-primary"]');
		isupportjolla.SecondaryView = document.querySelector('div[data-isupportjolla="view-secondary"]');

		if (typeof options !== "undefined") { // If options are provided
			isupportjolla.Config = options; // Set the Config to options
			isupportjolla.lang.PropagateLanguageBar(); // Propagate the language bar
		}

		isupportjolla.twitter.Init(); // Initialize the Twitter Functionality
	}
}