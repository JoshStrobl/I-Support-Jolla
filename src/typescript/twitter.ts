// This is the Twitter module of isupportjolla
/// <reference path="interfaces.ts" />

module isupportjolla.twitter {

    export var Form;
    export var FormInput;
    export var FormButton;
    export var IsTwitterBlocked : boolean;
    export var IsTwitterBlockedMessage : string = "Twitter widget being blocked by browser. Lemme guess, Ghostery?";

    // Init
    // This function will initiatize the Twitter functionality on the site
    export function Init(){
        isupportjolla.twitter.GenerateForm(); // Create the Tweet form
        isupportjolla.twitter.FormInput.addEventListener("input", isupportjolla.twitter.TrackInput); // Track text input on input of tweetFormInput

        isupportjolla.twitter.IsTwitterBlocked = !((typeof twttr !== "undefined") && (typeof twttr.widgets !== "undefined")); // Define IsTwitterBlocked as bool of type checking of twttr

        if (window.location.toString().indexOf("sailfish") == -1){ // If we are not on the Sailfish page
            isupportjolla.twitter.GenerateTimeline(); // Create the Sailor Timeline
        } else { // If we are on the Sailfish Page
            isupportjolla.twitter.GenerateSailfishPhotoGrid(); // Generate the Sailfish Photo Grid
        }
    }

    // Activate Load Prompt
    // This function will active the load prompt button (render and add listening func)
    export function ActivateLoadPrompt(element : Element, onclickFunc : Function){
        var loadPromptButton = element.querySelector('div[data-isupportjolla-component="button"][data-is-for-twitter]');

        if (loadPromptButton !== null){ // If the loadPromptButton exists

            // #region ActivateWidget func

            var activateWidget : any = function(){
                var loadPromptButton : Element = arguments[0];
                var onclickFunc : Function = arguments[1];

                loadPromptButton.setAttribute("hide", "true"); // Set hide attribute to hide
                onclickFunc(); // Call onclickFunc
            }.bind(this, loadPromptButton, onclickFunc);

            // #endregion

            loadPromptButton.removeAttribute("hide"); // Remove any hide attribute to show
            loadPromptButton.addEventListener("click", activateWidget);
        }
    }

    // Create Sailor Feed Timeline
    // This function will create the Twitter timeline of the Sailor Feed
    export function CreateSailorFeedTimeline(){
        var sailorFeedTimeline : Element = isupportjolla.Sidepane.querySelector('div[data-isupportjolla-component="sailor-feed-timeline"]'); // Get the Sailor Feed Timeline Elemnet

        if (sailorFeedTimeline !== null){ // If the Sailor Feed Timeline div exists
            if (!isupportjolla.twitter.IsTwitterBlocked){ // If Twitter is not blocked
                twttr.widgets.createTimeline('675772340106608640', sailorFeedTimeline, { // Create the Sailor Feed Timeline
                    "height" : 400,
                    "border" : "#ffffff",
                    "chrome" : "noheader,nofooter,noborders,transparent",
                    "tweetLimit" : 10
                });
            } else { // If Twitter is blocked
                isupportjolla.errors.CreateError("twttr", isupportjolla.twitter.IsTwitterBlockedMessage, sailorFeedTimeline); // Create a Twitter error message and append to sailorFeedTimeline
            }
        }
    }

    // Create Sailfish Experience Timeline
    // This function will create the Grid widget from the Sailfish OS Experience Timeline
    export function CreateSailfishExperienceTimeline(){
        var sailfishExperienceTimeline : Element = document.querySelector('div[data-isupportjolla-component="sailfish-experience-timeline"]'); // Get the Sailfish-specific timeline ELement

        if (sailfishExperienceTimeline !== null){ // If the Full-Width Content Element exists on a Sailfish page
            if (!isupportjolla.twitter.IsTwitterBlocked){ // If Twitter is not blocked
                twttr.widgets.createGridFromCollection('678194475089444864', sailfishExperienceTimeline, { // Create the Grid COllection
                    "height" : 400,
                    "border" : "#ffffff",
                    "chrome" : "noheader,nofooter,noborders,transparent",
                    "tweetLimit" : 5,
                    "limit" : 5
                });
            } else { // If Twitter is blocked
                isupportjolla.errors.CreateError("twttr", isupportjolla.twitter.IsTwitterBlockedMessage, sailfishExperienceTimeline); // Create a Twitter error message and append to sailfishExperienceTimeline
            }
        }
    }

    //  Generate Tweet Form
    export function GenerateForm(){
        isupportjolla.twitter.Form = document.querySelector('div[data-isupportjolla-component="tweet-form"]'); // Get the Tweet Form

        isupportjolla.twitter.FormInput = document.createElement("textarea"); // Create a textarea
        isupportjolla.twitter.FormInput.setAttribute("placeholder", "Input positive tweet with #ISupportJolla"); // Placeholder
        isupportjolla.twitter.FormInput.setAttribute("maxlength", "140"); // Set maxlength to 140 characters
        isupportjolla.twitter.FormInput.setAttribute("tabindex", "1"); // Set tabindex to 1

        isupportjolla.twitter.FormButton = document.createElement("a"); // Create a link
        isupportjolla.twitter.FormButton.setAttribute("target", "_blank"); // Set target to _blank
        isupportjolla.twitter.FormButton.textContent = "Tweet"; // Set textContent to Tweet
        isupportjolla.twitter.FormButton.setAttribute("tabindex", "2"); // Set tabindex to 2

        isupportjolla.twitter.Form.appendChild(isupportjolla.twitter.FormInput); // Append the textarea
        isupportjolla.twitter.Form.appendChild(isupportjolla.twitter.FormButton); // Append the button
    }

    // Generate Sailfish Photo Grid
    // This function will generate the Twitter Grid Collection for the Sailfish OS images
    export function GenerateSailfishPhotoGrid(){
        var fullWidthElement : Element = document.querySelector('div[data-isupportjolla-component="fullwidth-content"][data-isupportjolla-page="sailfish"]'); // Get the Sailfish-specific full-width page

        if (isupportjolla.GetPageWidth() > 600){ // If the page is greater than 600px
            isupportjolla.twitter.CreateSailfishExperienceTimeline(); // Automatically create the Sailfish Experience Timeline
        } else { // If the page is 600 or less pixels in width
            isupportjolla.twitter.ActivateLoadPrompt(fullWidthElement, isupportjolla.twitter.CreateSailfishExperienceTimeline); // Activate the load prompt with fullWidthElement and CreateSailfishExperienceTimeline
        }
    }

    // Generate Twitter Timelne
    export function GenerateTimeline(){
        if (isupportjolla.GetPageWidth() > 600){ // If the page is greater than 600px
            isupportjolla.twitter.CreateSailorFeedTimeline(); // Automatially create the Sailor Feed Timeline
        } else { // If the page is 600 or less pixels in width
            isupportjolla.twitter.ActivateLoadPrompt(isupportjolla.Sidepane, isupportjolla.twitter.CreateSailorFeedTimeline); // Activate the load prompt on Sidepane to CreateSailorFeedTimeline
        }
    }

    // Track Text Input
    export function TrackInput(){
        if (isupportjolla.twitter.FormInput.value.indexOf("#ISupportJolla") !== -1){ // If the Tweet Form Input contains #ISupportJolla
            var urlEncodedTweetContent : string = encodeURIComponent(isupportjolla.twitter.FormInput.value); // URL encode the tweet
            var tweetShareLocation : string = "https://twitter.com/share?related=JoshStrobl" + encodeURIComponent(",") + "JollaHQ&text=" + urlEncodedTweetContent;
            isupportjolla.twitter.FormButton.setAttribute("href", tweetShareLocation); // Set href of link to tweetShareLocation
        } else { // If the Tweet Form Input does not contain #ISupportJolla
            isupportjolla.twitter.FormButton.removeAttribute("href"); // Remove href attribute
        }
    }

}