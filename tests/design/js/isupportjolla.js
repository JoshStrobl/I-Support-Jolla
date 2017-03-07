var isupportjolla;
(function (isupportjolla) {
    var errors;
    (function (errors) {
        function CreateError(type, message, autoAppendTo) {
            var errorDiv = document.createElement("div");
            errorDiv.setAttribute("data-isupportjolla-error", type);
            errorDiv.textContent = message;
            if (typeof autoAppendTo !== "undefined") {
                autoAppendTo.appendChild(errorDiv);
            }
            return errorDiv;
        }
        errors.CreateError = CreateError;
    })(errors = isupportjolla.errors || (isupportjolla.errors = {}));
})(isupportjolla || (isupportjolla = {}));
var twttr;
var isupportjolla;
(function (isupportjolla) {
    var lang;
    (function (lang) {
        function GetDirection() {
            return document.body.getAttribute("dir");
        }
        lang.GetDirection = GetDirection;
        function GetLanguage() {
            return document.querySelector("html").getAttribute("lang");
        }
        lang.GetLanguage = GetLanguage;
        function PropagateLanguageBar() {
            if ((typeof isupportjolla.Config.Languages == "string") && (isupportjolla.Config.Languages.length !== 0)) {
                var languageBar = document.querySelector('header > div[data-isupportjolla="lang-nav"]');
                var languagesArray = isupportjolla.Config.Languages.split(",");
                var pageURL = document.location.href;
                var rootURL = pageURL.substr(0, pageURL.lastIndexOf(isupportjolla.lang.GetLanguage()));
                var htmlFile = document.location.href.substr(pageURL.lastIndexOf("/"));
                for (var _i = 0, languagesArray_1 = languagesArray; _i < languagesArray_1.length; _i++) {
                    var language = languagesArray_1[_i];
                    var newLink = document.createElement("a");
                    newLink.href = rootURL + language + htmlFile;
                    newLink.textContent = language;
                    languageBar.appendChild(newLink);
                }
            }
        }
        lang.PropagateLanguageBar = PropagateLanguageBar;
    })(lang = isupportjolla.lang || (isupportjolla.lang = {}));
})(isupportjolla || (isupportjolla = {}));
var isupportjolla;
(function (isupportjolla) {
    var twitter;
    (function (twitter) {
        twitter.IsTwitterBlockedMessage = "Twitter widget being blocked by browser. Lemme guess, Ghostery?";
        function Init() {
            isupportjolla.twitter.IsTwitterBlocked = !((typeof twttr == "object") && (typeof twttr.widgets == "object"));
            if (window.location.toString().indexOf("community") == -1) {
                isupportjolla.twitter.CreateSailorFeedTimeline();
            }
            else {
                isupportjolla.twitter.CreateSailfishExperienceTimeline();
            }
        }
        twitter.Init = Init;
        function CreateSailorFeedTimeline() {
            var sailorFeedTimeline = isupportjolla.SecondaryView.querySelector('section[data-isupportjolla="sailor-feed-timeline"]');
            if (sailorFeedTimeline !== null) {
                if (!isupportjolla.twitter.IsTwitterBlocked) {
                    twttr.widgets.createTimeline({
                        id: "675772194623004672"
                    }, sailorFeedTimeline, {
                        height: 400,
                        border: "#ffffff",
                        chrome: "noheader,nofooter,transparent",
                        lang: isupportjolla.lang.GetLanguage(),
                        tweetLimit: 5
                    });
                }
                else {
                    isupportjolla.errors.CreateError("twttr", isupportjolla.twitter.IsTwitterBlockedMessage, sailorFeedTimeline);
                }
            }
        }
        twitter.CreateSailorFeedTimeline = CreateSailorFeedTimeline;
        function CreateSailfishExperienceTimeline() {
            var sailfishExperienceTimeline = isupportjolla.SecondaryView.querySelector('section[data-isupportjolla="sailfish-experience-timeline"]');
            if (sailfishExperienceTimeline !== null) {
                if (!isupportjolla.twitter.IsTwitterBlocked) {
                    twttr.widgets.createTimeline({
                        sourceType: "collection",
                        id: "678194475089444864",
                    }, sailfishExperienceTimeline, {
                        height: 400,
                        border: "#ffffff",
                        chrome: "noheader,nofooter,transparent",
                        lang: isupportjolla.lang.GetLanguage(),
                        tweetLimit: 3
                    });
                }
                else {
                    isupportjolla.errors.CreateError("twttr", isupportjolla.twitter.IsTwitterBlockedMessage, sailfishExperienceTimeline);
                }
            }
        }
        twitter.CreateSailfishExperienceTimeline = CreateSailfishExperienceTimeline;
    })(twitter = isupportjolla.twitter || (isupportjolla.twitter = {}));
})(isupportjolla || (isupportjolla = {}));
var isupportjolla;
(function (isupportjolla) {
    function Init(options) {
        isupportjolla.PrimaryView = document.querySelector('div[data-isupportjolla="view-primary"]');
        isupportjolla.SecondaryView = document.querySelector('div[data-isupportjolla="view-secondary"]');
        if (typeof options !== "undefined") {
            isupportjolla.Config = options;
            isupportjolla.lang.PropagateLanguageBar();
        }
        isupportjolla.twitter.Init();
    }
    isupportjolla.Init = Init;
})(isupportjolla || (isupportjolla = {}));
