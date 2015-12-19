// I Support Jolla - Typescript
/// <reference path="errors.ts" />
/// <reference path="interfaces.ts" />
/// <reference path="letters.ts" />
/// <reference path="net.ts" />
/// <reference path="twitter.ts" />

module isupportjolla {

    export var PrimaryContent : Element; // PrimaryContent is the HTMLElement of the primary content section
    export var Sidepane : Element; // Sidepane is the HTMLElement of the sidepane

    // Init
    // This function is responsible for the appropriate initialization of aspects of the page
    export function Init(){
        isupportjolla.PrimaryContent = document.querySelector('div[data-isupportjolla-component="primary-content"]');
        isupportjolla.Sidepane = document.querySelector('div[data-isupportjolla-component="sidepane"]');

        isupportjolla.twitter.GenerateForm(); // Create the Tweet form
        isupportjolla.twitter.GenerateTimeline(); // Create the Twitter Timelines
        isupportjolla.twitter.FormInput.addEventListener("input", isupportjolla.twitter.TrackInput); // Track text input on input of tweetFormInput

        if (window.location.toString().indexOf("letters") !== -1){ // If we are on the Letters Page
            isupportjolla.letters.Init(); // Init Letters UX
        }
    }
}