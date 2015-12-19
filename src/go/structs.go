package main

// ErrorResponse Structure
// This structure reflects an error
type ErrorResponse struct {
	Error string
}

// LetterAPIRequest struct
type LetterAPIRequest struct {
    Action string
    LetterId string

    // For remote adding, don't do anything yet
    Key string
    Content string
}

// LetterAuthor struct
type LetterAuthor struct {
    Avatar string
    Name string
}

// LetterMetadata struct
type LetterMetadata struct {
    Title string
    Date int64 // Unix Timelnes
    Author LetterAuthor // Author Information
    Description string
}