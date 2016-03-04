// I Support Jolla - Typescript
/// <reference path="errors.ts" />
/// <reference path="interfaces.ts" />
/// <reference path="lang.ts" />
/// <reference path="letters.ts" />
/// <reference path="net.ts" />
/// <reference path="twitter.ts" />

module isupportjolla {

    export var Config : ConfigOptions; // Define Config as a ConfigOptions interface
    export var PrimaryContent : Element; // PrimaryContent is the HTMLElement of the primary content section
    export var Sidepane : Element; // Sidepane is the HTMLElement of the sidepane

    // Init
    // This function is responsible for the appropriate initialization of aspects of the page
    export function Init(options ?: ConfigOptions){
        isupportjolla.PrimaryContent = document.querySelector('div[data-isupportjolla-component="primary-content"]');
        isupportjolla.Sidepane = document.querySelector('div[data-isupportjolla-component="sidepane"]');

        if (typeof options !== "undefined"){ // If options are provided
            isupportjolla.Config = options; // Set the Config to options
            isupportjolla.lang.PropagateLanguageBar(); // Propagate the language bar
        }

        isupportjolla.twitter.Init(); // Initialize the Twitter Functionality

        if (window.location.toString().indexOf("letters") !== -1){ // If we are on the Letters Page
            isupportjolla.letters.Init(); // Init Letters UX
        }
    }

    // GetPageWidth
    // This function will get the current page width
    export function GetPageWidth() : number {
        return document.body.getClientRects()[0].width;
    }
}