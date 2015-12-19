declare module isupportjolla.errors {
    function CreateError(type: string, message: string): HTMLDivElement;
}
declare var twttr: any;
interface LetterAuthor extends Object {
    Avatar: string;
    Name: string;
}
interface LetterMetadata extends Object {
    Title: string;
    Date: number;
    Author: LetterAuthor;
    Description: string;
}
declare module isupportjolla.net {
    function RequestHandler(): void;
    function Request(url: string, method: string, data: any, func?: Function): void;
}
declare module isupportjolla.letters {
    var BackButton: any;
    var PublishedLetterContainer: any;
    var PublishedLetter: any;
    var PublishedLetterContent: any;
    function Init(): void;
    function LoadLettersUX(): void;
    function CreateLetterListItem(letterMetadata: LetterMetadata): HTMLDivElement;
    function CreateLetterMetadata(letterMetadata: LetterMetadata): HTMLDivElement;
    function LoadLetter(id: string, letterMetadata: LetterMetadata): void;
    function HideLetter(): void;
}
declare module isupportjolla.twitter {
    var Form: any;
    var FormInput: any;
    var FormButton: any;
    function GenerateForm(): void;
    function GenerateTimeline(): void;
    function TrackInput(): void;
}
declare module isupportjolla {
    var PrimaryContent: Element;
    var Sidepane: Element;
    function Init(): void;
}
