package main

import (
    "fmt"
    "encoding/json"
    "errors"
    "github.com/StroblIndustries/metis-pkg" // Import netis-pkg
    "net/http"
    "os"
    "io/ioutil"
    "log/syslog" // System-level logging
    "time"
)

var letters map[string]interface{}

type httpHandler struct{}

// ServeHTTP
// This function handles the requesting of data provided over an HTTP POST
func (*httpHandler) ServeHTTP(writer http.ResponseWriter, request *http.Request){
    var response []byte   // Define response as an array of bytes
	var errorObject error // Define errorObject as an error

	writer.Header().Set("Access-Control-Allow-Origin", "*") // Enable Access-Control-Allow-Origin

    if request.Body != nil { // If the response has body content
        var letterAPIRequest LetterAPIRequest // Define letterAPIRequest as a LetterAPIRequest
        var decodeError error           // Define decodeError as a potential error given by decoding requester.Body

        jsonDecoder := json.NewDecoder(request.Body) // Decode jsonDecoder as a new JSON Decoder that will decode the request.Body
        decodeError = jsonDecoder.Decode(&letterAPIRequest) // Decode the JSON into the letterAPIRequest var, handing error to decodeError

        if decodeError == nil { // If there was no decodeError
            response, errorObject = LetterAPIRequestHandler(letterAPIRequest) // Call LetterAPIRequestHandler and return response and/or error
        } else { // If there was a decode error
            errorObject = errors.New("Invalid request.")
        }
    } else {
        errorObject = errors.New("Request body has no content.")
    }

    if errorObject != nil { // If there was an error
		errorResponseObject := ErrorResponse{Error: fmt.Sprintf("%v", errorObject)} // Create an errorResponseObject where the val is the value of the errorObject
		response, _ = json.Marshal(errorResponseObject)                             // Encode the errorResponseObject instead
	}

    writer.Write(response) // Write the response
}

// LetterAPIRequestHandler
// This function ingests letterAPIRequest and does the appropriate Action
func LetterAPIRequestHandler(letterAPIRequest LetterAPIRequest) ([]byte, error){
    var response []byte
    var errorObject error

    if letterAPIRequest.Action != "" { // If an action was provided
        if letterAPIRequest.Action == "get" { // If Action is get
            if letterAPIRequest.LetterId != "" { // If a LetterId is defined

                if letterAPIRequest.LetterId == "all" { // If we are getting the metadata for the Letters page (thus, select all)
                    response, _ = json.Marshal(letters) // Define responseObject as the letters map
                } else { // If the LetterId is not "all"
                    response, errorObject = ioutil.ReadFile("/etc/isupportjolla/letters/" + letterAPIRequest.LetterId + ".html") // Get the HTML file

                    if errorObject != nil { // If there was an error fetching the file
                        errorObject = errors.New("Failed to fetch Letter.")
                    }
                }
            } else { // If no LetterId is defined
                errorObject = errors.New("No LetterId is defined")
            }
        }
    } else { // If no action was provided
        errorObject = errors.New("No action was provided.")
    }

    return response, errorObject
}

// Init
func init(){
    letters = make(map[string]interface{}) // Create the initial empty map shell
}

// Main
func main(){
    metisNodeList, metisReadError := ioutil.ReadFile("/etc/metis/nodeList.json") // Get the nodeList.json from /etc/metis if it exists
    var initializationFailureMessage string // Define initializationFailureMessage as the message we will output if init fails
    initializationSucceeded := true // Default to initializationSucceeded to being true

    if metisReadError == nil { // If there was no error reading the nodeList.json
        metis.Configure(metis.MetisConfig{ DataRootDirectory : "/etc/metis/data/"}) // Set metis pkg to configure to have data root dir at /etc/metis/data
        initializationSucceeded = metis.Initialize(metisNodeList)

        if !initializationSucceeded { // If initialization did not success
            initializationFailureMessage = "Failed to initialize Metis"
        }
    } else { // If there was an error reading the nodeList.json
        initializationFailureMessage = "Failed to find nodeList.json from /etc/metis."
    }

    if initializationFailureMessage != "" { // If there was an initialization failure message
        metis.MessageLogger(syslog.LOG_ERR, initializationFailureMessage)
        fmt.Println(initializationFailureMessage)
        os.Exit(1)
    }

    // Anything beyond this point is safe to assume metis is operational.

    var logMessage string
    lettersMetadataIoObject := metis.Read([]string{"LetterMetadata"}, []string{"metadata"}) // Read from LetterMetadata
    letters = lettersMetadataIoObject["metadata"].(map[string]interface{}) // Get the metadata interface{} from lettersMetadataIoObject, type infer to map[string]interface{}

    if letters["Error"] == nil { // If there was no error fetching the file
        letterServer := http.Server{
            Addr:         ":4955",
            Handler:      &httpHandler{},
            ReadTimeout:  time.Second * 3,
            WriteTimeout: time.Second * 10,
        }

        fmt.Println("Starting Letter Server")
        serveFail := letterServer.ListenAndServe() // Listen on designated port

        if serveFail != nil { // If we failed to start the server
            logMessage = "Failed to start Letter Server."
        }
    } else { // If it failed to find letter metadata
        logMessage = "Failed to read metadata from LetterMetadata Node."
    }

    if logMessage != "" { // If there is a log message
        metis.MessageLogger(syslog.LOG_ERR, logMessage) // Log the message
        fmt.Println(logMessage) // STDOUT
        os.Exit(1)
    }
}