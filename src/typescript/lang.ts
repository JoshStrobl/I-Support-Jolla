// Functionality for language-oriented actions in I Support Jolla

module isupportjolla {

    // GetDirection
    // This function gets the direction used in the document
    export function GetDirection() : string {
        return document.body.getAttribute("dir"); // Return the dir attribute from body
    }

    // GetLanguage
    // This function gets the current language of the document
    export function GetLanguage() : string {
        return document.querySelector("html").getAttribute("lang"); // Get the lang attribute value from the html Element
    }
}