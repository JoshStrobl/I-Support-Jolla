// This is the Twitter module of isupportjolla
/// <reference path="errors.ts" />
/// <reference path="interfaces.ts" />
/// <reference path="isupportjolla.ts" />
/// <reference path="lang.ts" />

module isupportjolla.twitter {
	export var IsTwitterBlocked: boolean;
	export var IsTwitterBlockedMessage: string = "Twitter widget being blocked by browser. Lemme guess, Ghostery?";

	// Init
	// This function will initiatize the Twitter functionality on the site
	export function Init() {
		isupportjolla.twitter.IsTwitterBlocked = !((typeof twttr == "object") && (typeof twttr.widgets == "object")); // Define IsTwitterBlocked as bool of type checking of twttr

		if (window.location.toString().indexOf("community") == -1) { // If we are not on the Community page
			isupportjolla.twitter.CreateSailorFeedTimeline(); // Create the Sailor Timeline
		} else { // If we are on the Community page
			isupportjolla.twitter.CreateSailfishExperienceTimeline(); // Generate the Sailfish Photo Grid
		}
	}

	// Create Sailor Feed Timeline
	// This function will create the Twitter timeline of the Sailor Feed
	export function CreateSailorFeedTimeline() {
		let sailorFeedTimeline: Element = isupportjolla.SecondaryView.querySelector('section[data-isupportjolla="sailor-feed-timeline"]'); // Get the Sailor Feed Timeline Elemnet

		if (sailorFeedTimeline !== null) { // If the Sailor Feed Timeline div exists
			if (!isupportjolla.twitter.IsTwitterBlocked) { // If Twitter is not blocked
				twttr.widgets.createTimeline( // Create the Sailor Feed Timeline
					{
						id: "675772194623004672"
					},
					sailorFeedTimeline,
					{
						height: 400,
						border: "#ffffff",
						chrome: "noheader,nofooter,transparent",
						lang: isupportjolla.lang.GetLanguage(),
						tweetLimit: 5
					}
				);
			} else { // If Twitter is blocked
				isupportjolla.errors.CreateError("twttr", isupportjolla.twitter.IsTwitterBlockedMessage, sailorFeedTimeline); // Create a Twitter error message and append to sailorFeedTimeline
			}
		}
	}

	// Create Sailfish Experience Timeline
	// This function will create the Grid widget from the Sailfish OS Experience Timeline
	export function CreateSailfishExperienceTimeline() {
		let sailfishExperienceTimeline: Element = isupportjolla.SecondaryView.querySelector('section[data-isupportjolla="sailfish-experience-timeline"]'); // Get the Sailfish-specific timeline ELement

		if (sailfishExperienceTimeline !== null) { // If the Full-Width Content Element exists on a Sailfish page
			if (!isupportjolla.twitter.IsTwitterBlocked) { // If Twitter is not blocked
				twttr.widgets.createTimeline(
					{ // Create the Grid Collection
						sourceType: "collection",
						id: "678194475089444864",
					},
					sailfishExperienceTimeline,
					{
						height: 400,
						border: "#ffffff",
						chrome: "noheader,nofooter,transparent",
						lang: isupportjolla.lang.GetLanguage(),
						tweetLimit: 3
					}
				);
			} else { // If Twitter is blocked
				isupportjolla.errors.CreateError("twttr", isupportjolla.twitter.IsTwitterBlockedMessage, sailfishExperienceTimeline); // Create a Twitter error message and append to sailfishExperienceTimeline
			}
		}
	}
}