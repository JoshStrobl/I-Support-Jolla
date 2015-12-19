// This is the module for handling the Letters UX
/// <reference path="isupportjolla.ts" />
/// <reference path="interfaces.ts" />
/// <reference path="errors.ts" />
/// <reference path="net.ts" />

module isupportjolla.letters {

    export var BackButton : any;
    export var PublishedLetterContainer : any;
    export var PublishedLetter : any;
    export var PublishedLetterContent : any;

    // Init
    // Init the variables
    export function Init(){
        isupportjolla.letters.BackButton = document.querySelector('div[data-isupportjolla-component="back-button"]');
        isupportjolla.letters.PublishedLetterContainer = document.querySelector('div[data-isupportjolla-component="letter-container"]');
        isupportjolla.letters.PublishedLetter = isupportjolla.letters.PublishedLetterContainer.querySelector('div[data-isupportjolla-component="published-letter"]');
        isupportjolla.letters.PublishedLetterContent = isupportjolla.letters.PublishedLetterContainer.querySelector('div[data-isupportjolla-component="published-letter-content"]');

        isupportjolla.letters.BackButton.addEventListener("click", isupportjolla.letters.HideLetter); // Hide the letter on click of back button
        isupportjolla.letters.LoadLettersUX(); // Load Letters UX
    }

    // Load Letters UX
    // This function will get the Letters Metadata and create Letter List Items, appending them to the Letters List
    export function LoadLettersUX(){

        // #region LettersUXResponseHandler
        // This inner function will handle construction of letter metadata items or failures

        var LettersUXResponseHandler : Function = function(response : Object){
            if (typeof response["Error"] == "undefined"){ // If there was no failure in fetching the items
                var letterKeys : Array<string> = Object.keys(response);

                if (letterKeys.length !== 0) { // If there are letters
                    var listItemContainer : HTMLDivElement = document.createElement("div"); // Create the container for the List Items
                    listItemContainer.setAttribute("data-isupportjolla-component", "letters-list-items");

                    isupportjolla.PrimaryContent.querySelector('div[data-isupportjolla-component="letters-list"]').appendChild(listItemContainer); // Append the List Item container

                    for (var letterId of letterKeys){ // For each letterId of the response's Object keys
                        var letterMetadata : LetterMetadata = response[letterId];
                        var letterListItem : HTMLDivElement = isupportjolla.letters.CreateLetterListItem(letterMetadata); // Create a Letter List Item
                        listItemContainer.insertBefore(letterListItem, listItemContainer.firstChild); // Prepend, since later Ids == later (more recent) letters

                        letterListItem.querySelector('div[data-isupportjolla-component="letter-metadata"] > span').addEventListener("click",
                            isupportjolla.letters.LoadLetter.bind(this, letterId, letterMetadata)
                        );
                    }
                } else { // If there are no letters
                    response["Error"] = "No Letters are currently available.";
                }
            }

            if (typeof response["Error"] == "string"){ // If there was an error during request or there are no items
                var errorElement : HTMLDivElement = isupportjolla.errors.CreateError("server-unreachable", response["Error"]); // Create an error Element with the response.Error content
                isupportjolla.PrimaryContent.appendChild(errorElement); // Append the error Element to PrimaryContent
            }
        }

        // #endregion

        isupportjolla.net.Request("http://isupportjolla.com/letters-api", "POST", { "Action" : "get", "LetterId" : "all" }, LettersUXResponseHandler); // Send the request to get all metadata Objects
    }

    // Create Letter List Item
    // This function will create a Letter List Item using the appropriate metadata and return the Element
    export function CreateLetterListItem(letterMetadata : LetterMetadata) : HTMLDivElement {
        var letterListItem : HTMLDivElement = document.createElement("div"); // Create the div Element
        letterListItem.setAttribute("data-isupportjolla-component", "letters-list-item"); // Set component to letters-list-item

        var letterListItemMetadata = isupportjolla.letters.CreateLetterMetadata(letterMetadata); // Create the LetterMetadata Element

        var letterListItemDescription : HTMLParagraphElement = document.createElement("p"); // Create the p Element for the List Item's Description
        letterListItemDescription.textContent = decodeURIComponent(letterMetadata.Description); // Decode the content

        letterListItem.appendChild(letterListItemMetadata); // Append the metadata
        letterListItem.appendChild(letterListItemDescription); // Append the description

        return letterListItem;
    }

    // CreateLetterMetadata
    // This function creates an Element containing the metadata of the Letter
    export function CreateLetterMetadata(letterMetadata : LetterMetadata) : HTMLDivElement {
        var letterListItemMetadata : HTMLDivElement = document.createElement("div"); // Create the div Element for the List Item's Metadata
        letterListItemMetadata.setAttribute("data-isupportjolla-component", "letter-metadata"); // Set component to list-item-metadata

        var letterListItemImage : HTMLImageElement = document.createElement("img"); // Create the img Element of the author's avatar
        letterListItemImage.setAttribute("src", letterMetadata.Author.Avatar); // Set to the Metadata's Author's Avatar
        letterListItemMetadata.appendChild(letterListItemImage);

        var letterListItemTitle : HTMLSpanElement = document.createElement("span"); // Create the span Element of the letter's title
        letterListItemTitle.textContent = letterMetadata.Title;
        letterListItemMetadata.appendChild(letterListItemTitle);

        var letterListItemAuthor : HTMLPhraseElement = document.createElement("b"); // Create the b Element of the letter's author's name
        letterListItemAuthor.textContent = letterMetadata.Author.Name; // Set to Metadata's Author's Name
        letterListItemMetadata.appendChild(letterListItemAuthor);

        var letterListItemDate : HTMLPhraseElement = document.createElement("u"); // Create the u Element of the letter's Date
        letterListItemDate.textContent = (new Date(letterMetadata.Date * 1000)).toUTCString(); // Set textContent to UTC string of Date
        letterListItemMetadata.appendChild(letterListItemDate);

        return letterListItemMetadata; // Return the letterListItemMetadata
    }

    // LoadLetter
    // This function will fetch and load the letter contents
    export function LoadLetter(id : string, letterMetadata : LetterMetadata){

        // #region LetterAPIRequestHandler

        var LetterAPIRequestHandler : Function = function(){
            var LetterMetadata : Object = arguments[0];
            var responseContent : any = arguments[1];

            if (typeof responseContent !== "object"){ // If this is NOT an object, meaning we successfully fetched the HTML
                var letterMetadataElement : HTMLDivElement = isupportjolla.letters.CreateLetterMetadata(letterMetadata); // Create the letterMetadataElement
                isupportjolla.letters.PublishedLetter.insertBefore(letterMetadataElement, isupportjolla.letters.PublishedLetterContent); // Prepend metadata element before content
                isupportjolla.letters.PublishedLetterContent.innerHTML = responseContent; // Set innerHTML of PublishedLetterContent to responseContent

                isupportjolla.PrimaryContent.querySelector('div[data-isupportjolla-component="letters-list-items"]').setAttribute("hide", ""); // Hide the items
                isupportjolla.letters.PublishedLetterContainer.setAttribute("show", "true"); // Show the Published Letter
            } else { // If responseContent is an object, meaning there was an error
                var errorDiv : HTMLDivElement = isupportjolla.errors.CreateError("server-unreachable", responseContent["Error"]); // Create an error Element
                isupportjolla.PrimaryContent.appendChild(errorDiv); // Append the errorDiv to PrimaryContent
            }
        }.bind(this, letterMetadata); // Bind the metadata

        // #endregion

        isupportjolla.net.Request("http://isupportjolla.com/letters-api", "POST", { "Action" : "get", "LetterId" : id}, LetterAPIRequestHandler); // Request the letter
    }

    // HideLetter
    // This function will hide the Letter, show Letter list, then destroy letter content
    export function HideLetter(){
        var errorDivInPrimaryContent = isupportjolla.PrimaryContent.querySelector('div[data-isupportjolla-error]');

        if (errorDivInPrimaryContent !== null){ // If there is an error in PrimaryContent
            isupportjolla.PrimaryContent.removeChild(errorDivInPrimaryContent); // Remove the error
        } else { // If there was no error, meaning we successfully fetched a letter
            var metadataElement = isupportjolla.letters.PublishedLetter.querySelector('div[data-isupportjolla-component="letter-metadata"]');
            isupportjolla.letters.PublishedLetter.removeChild(metadataElement); // Remove the metadata
            isupportjolla.letters.PublishedLetterContent.innerHTML = ""; // Empty the inner HTML

            isupportjolla.PrimaryContent.querySelector('div[data-isupportjolla-component="letters-list-items"]').removeAttribute("hide"); // Show the items by removing hide attribute
            isupportjolla.letters.PublishedLetterContainer.removeAttribute("show"); // Remove the show attribute from PublishedLetter to hide it (it defaults in LESS to not display)
        }
    }
}