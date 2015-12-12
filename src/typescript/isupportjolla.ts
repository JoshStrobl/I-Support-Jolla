// I Support Jolla - Typescript

var twttr : any;

module isupportjolla {

    export var tweetFormArea;
    export var tweetFormInput;
    export var tweetFormButton;

    // #region Generate Tweet Form Contents

    export function generateTweetFormContents(){
        isupportjolla.tweetFormArea = document.querySelector('div[data-isupportjolla-component="tweet-form"]'); // Get the Tweet Form

        isupportjolla.tweetFormInput = document.createElement("textarea"); // Create a textarea
        isupportjolla.tweetFormInput.setAttribute("placeholder", "Input positive tweet with #ISupportJolla"); // Placeholder
        isupportjolla.tweetFormInput.setAttribute("maxlength", "140"); // Set maxlength to 140 characters

        isupportjolla.tweetFormButton = document.createElement("a"); // Create a link
        isupportjolla.tweetFormButton.setAttribute("target", "_blank"); // Set target to _blank
        isupportjolla.tweetFormButton.textContent = "Tweet"; // Set textContent to Tweet

        isupportjolla.tweetFormArea.appendChild(isupportjolla.tweetFormInput); // Append the textarea
        isupportjolla.tweetFormArea.appendChild(isupportjolla.tweetFormButton); // Append the button
    }

    // #endregion

    // #region Generate Twitter Timelnes

    export function generateTwitterTimelines(){
        var sailorFeedTimeline : Element = document.querySelector('div[data-isupportjolla-component="sailor-feed-timeline"]'); // Get the Sailor Feed Timeline Elemnet

        if ((typeof twttr !== "undefined") && (typeof twttr.widgets !== "undefined")){ // If Twttr is defined
            twttr.widgets.createTimeline('675772340106608640', sailorFeedTimeline, { // Create the Sailor Feed Timeline
                "height" : 400,
                "border" : "#ffffff",
                "chrome" : "noheader,nofooter,noborders,transparent",
                "tweetLimit" : 15
            });
        } else { // If Twttr is not define, such as being blocked
            sailorFeedTimeline.setAttribute("data-isupportjolla-error", "twttr");
            sailorFeedTimeline.textContent = "Twitter widget being blocked by browser. Lemme guess, Ghostery?";
        }
    }

    // #endregion

    // #region Track Text Input

    export function trackTextInput(){
        if (isupportjolla.tweetFormInput.value.indexOf("#ISupportJolla") !== -1){ // If the Tweet Form Input contains #ISupportJolla
            var urlEncodedTweetContent : string = encodeURIComponent(isupportjolla.tweetFormInput.value); // URL encode the tweet
            var tweetShareLocation : string = "https://twitter.com/share?related=JoshStrobl" + encodeURIComponent(",") + "JollaHQ&text=" + urlEncodedTweetContent;
            isupportjolla.tweetFormButton.setAttribute("href", tweetShareLocation); // Set href of link to tweetShareLocation
        } else { // If the Tweet Form Input does not contain #ISupportJolla
            isupportjolla.tweetFormButton.removeAttribute("href"); // Remove href attribute
        }
    }

    // #endregion

    // #region Init

    export function Init(){
        generateTweetFormContents(); // Create the Tweet form
        generateTwitterTimelines(); // Create the Twitter Timelines
        isupportjolla.tweetFormInput.addEventListener("input", isupportjolla.trackTextInput); // Track text input on input of tweetFormInput
    }

    // #endregion
}