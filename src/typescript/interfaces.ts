// These are interfaces used throughout the I Support Jolla Typescript code

var twttr : any; // DefinitelyTyped definition for Twitter is currently outdated (we'll work on it and contribute upstream). Until then, set as any.

interface ConfigOptions extends Object {
    Languages : string;
    PositiveInputText : string;
}

interface LetterAuthor extends Object {
    Avatar : string;
    Name : string;
}

interface LetterMetadata extends Object {
    Title : string;
    Date : number; // Unix Timelnes
    Author : LetterAuthor; // Author Information
    Description : string;
}