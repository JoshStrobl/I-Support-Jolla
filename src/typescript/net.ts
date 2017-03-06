// This is the net module for I Support Jolla. This modules handles creating, sending, and returning requests

module isupportjolla.net {

    // RequestHandler
    // This function will handle request state changing and handling function calling
    export function RequestHandler(){
        var func : Function = arguments[0]; // Function is argument 0 (bound argument)
        var xhr : XMLHttpRequest = arguments[1].target; // Define xhr as the XMLHttpRequest passed
        var returnContext : any; // Define returnContext as any, since it could be plaintext or end up being an Object

        if (xhr.readyState == 4){ // If the request is DONE
            if (xhr.status == 200){ // If the server is up
                if (xhr.responseText.indexOf("{") !== 0){ // If there isn't even a { at the beginning of the text, it is safe to assume it isn't JSON
                    returnContext = xhr.responseText; // Set returnContext to responseText
                } else { // If it does start with a {
                    returnContext = JSON.parse(xhr.responseText); // Set returnContext to Object
                }
            } else { // If the server was not reachable or if the user is offline
                returnContext = { "Error" : "The server is currently not reachable."};

                if (!navigator.onLine) { // If we have determined the user is offline
                    returnContext["Error"] = returnContext["Error"] + " We have detected you are offline.";
                }
            }

            if (typeof func == "function"){ // If func is a function
                func(returnContext); // Call with the returnContext
            }
        }
    }

    // Request
    // This function requests to the URL with the data, returning the result to the function if it exists
    export function Request(url : string, method : string, data : any, func ?: Function){
        var xhr : XMLHttpRequest = new XMLHttpRequest(); // Create a new XMLHttpRequest
        xhr.open(method, url, true); // Open the XHR to URL with method

        if (typeof func == "function"){ // If func is defined as a function
            xhr.onreadystatechange = isupportjolla.net.RequestHandler.bind(this, func); // Set onload to RequestHandler bound with func
        }

        if (typeof data == "object"){ // If the data is an Object
            data = JSON.stringify(data); // Change to stringified JSON
        }

        xhr.send(data); // Send the data
    }
}