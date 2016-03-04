declare module isupportjolla.errors {
    function CreateError(type: string, message: string, autoAppendTo?: any): HTMLDivElement;
}
declare var twttr: any;
interface ConfigOptions extends Object {
    Languages: string;
}
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
declare module isupportjolla.lang {
    function GetDirection(): string;
    function GetLanguage(): string;
    function PropagateLanguageBar(): void;
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
    var IsTwitterBlocked: boolean;
    var IsTwitterBlockedMessage: string;
    function Init(): void;
    function ActivateLoadPrompt(element: Element, onclickFunc: Function): void;
    function CreateSailorFeedTimeline(): void;
    function CreateSailfishExperienceTimeline(): void;
    function GenerateForm(): void;
    function GenerateSailfishPhotoGrid(): void;
    function GenerateTimeline(): void;
    function TrackInput(): void;
}
declare module isupportjolla {
    var Config: ConfigOptions;
    var PrimaryContent: Element;
    var Sidepane: Element;
    function Init(options?: ConfigOptions): void;
    function GetPageWidth(): number;
}
