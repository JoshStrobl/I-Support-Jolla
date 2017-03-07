declare module isupportjolla.errors {
    function CreateError(type: string, message: string, autoAppendTo?: any): HTMLDivElement;
}
declare var twttr: any;
interface ConfigOptions extends Object {
    Languages: string;
}
declare module isupportjolla.lang {
    function GetDirection(): string;
    function GetLanguage(): string;
    function PropagateLanguageBar(): void;
}
declare module isupportjolla.twitter {
    var IsTwitterBlocked: boolean;
    var IsTwitterBlockedMessage: string;
    function Init(): void;
    function CreateSailorFeedTimeline(): void;
    function CreateSailfishExperienceTimeline(): void;
}
declare module isupportjolla {
    var Config: ConfigOptions;
    var PrimaryView: Element;
    var SecondaryView: Element;
    function Init(options?: ConfigOptions): void;
}
