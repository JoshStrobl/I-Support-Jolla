// This is the Twitter module of isupportjolla
/// <reference path="interfaces.ts" />

module isupportjolla.twitter {

    export var Form;
    export var FormInput;
    export var FormButton;

    // Init
    // This function will initiatize the Twitter functionality on the site
    export function Init(){
        isupportjolla.twitter.GenerateForm(); // Create the Tweet form
        isupportjolla.twitter.FormInput.addEventListener("input", isupportjolla.twitter.TrackInput); // Track text input on input of tweetFormInput

        if (window.location.toString().indexOf("sailfish") == -1){ // If we are not on the Sailfish page
            isupportjolla.twitter.GenerateTimeline(); // Create the Sailor Timeline
        } else { // If we are on the Sailfish Page
            isupportjolla.twitter.GenerateSailfishPhotoGrid(); // Generate the Sailfish Photo Grid
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
        var sailfishExperienceTimeline : Element = document.querySelector('div[data-isupportjolla-component="sailfish-experience-timeline"]'); // Get the Sailfish-specific timeline ELement

        if (sailfishExperienceTimeline !== null){ // If the Full-Width Content Element exists on a Sailfish page
            if ((typeof twttr !== "undefined") && (typeof twttr.widgets !== "undefined")){ // If Twttr is defined
                twttr.widgets.createGridFromCollection('678194475089444864', sailfishExperienceTimeline, { // Create the Grid COllection
                    "height" : 400,
                    "border" : "#ffffff",
                    "chrome" : "noheader,nofooter,noborders,transparent",
                    "limit" : 10
                });
            } else { // If Twttr is not define, such as being blocked
                var errorElement : HTMLDivElement = isupportjolla.errors.CreateError("twttr", "Twitter widget being blocked by browser. Lemme guess, Ghostery?"); // Create a Twitter error message
                sailfishExperienceTimeline.appendChild(errorElement); // Append the error Element
            }
        }
    }

    // Generate Twitter Timelne
    export function GenerateTimeline(){
        var sailorFeedTimeline : Element = document.querySelector('div[data-isupportjolla-component="sailor-feed-timeline"]'); // Get the Sailor Feed Timeline Elemnet

        if (sailorFeedTimeline !== null){ // If the Sailor Feed Timeline div exists
            if ((typeof twttr !== "undefined") && (typeof twttr.widgets !== "undefined")){ // If Twttr is defined
                twttr.widgets.createTimeline('675772340106608640', sailorFeedTimeline, { // Create the Sailor Feed Timeline
                    "height" : 400,
                    "border" : "#ffffff",
                    "chrome" : "noheader,nofooter,noborders,transparent",
                    "tweetLimit" : 10
                });
            } else { // If Twttr is not define, such as being blocked
                var errorElement : HTMLDivElement = isupportjolla.errors.CreateError("twttr", "Twitter widget being blocked by browser. Lemme guess, Ghostery?"); // Create a Twitter error message
                sailorFeedTimeline.appendChild(errorElement); // Append the error Element
            }
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