// This is the module to create Errors for I Support Jolla

module isupportjolla.errors {

    // Create Error
    // This function will create an error (HTMLDivElement) and return it
    export function CreateError(type : string, message : string, autoAppendTo ?: any) : HTMLDivElement {
        var errorDiv : HTMLDivElement = document.createElement("div"); // Create an HTMLDivElement
        errorDiv.setAttribute("data-isupportjolla-error", type); // Set type to data-isupportjolla-error
        errorDiv.textContent = message; // Set textContent to message

        if (typeof autoAppendTo !== "undefined"){ // If we should automatically append to an Element
            autoAppendTo.appendChild(errorDiv); // Append the error div
        }

        return errorDiv
    }

}