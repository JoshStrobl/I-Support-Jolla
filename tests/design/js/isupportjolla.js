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
    var net;
    (function (net) {
        function RequestHandler() {
            var func = arguments[0];
            var xhr = arguments[1].target;
            var returnContext;
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (xhr.responseText.indexOf("{") !== 0) {
                        returnContext = xhr.responseText;
                    }
                    else {
                        returnContext = JSON.parse(xhr.responseText);
                    }
                }
                else {
                    returnContext = { "Error": "The server is currently not reachable." };
                    if (!navigator.onLine) {
                        returnContext["Error"] = returnContext["Error"] + " We have detected you are offline.";
                    }
                }
                if (typeof func == "function") {
                    func(returnContext);
                }
            }
        }
        net.RequestHandler = RequestHandler;
        function Request(url, method, data, func) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            if (typeof func == "function") {
                xhr.onreadystatechange = isupportjolla.net.RequestHandler.bind(this, func);
            }
            if (typeof data == "object") {
                data = JSON.stringify(data);
            }
            xhr.send(data);
        }
        net.Request = Request;
    })(net = isupportjolla.net || (isupportjolla.net = {}));
})(isupportjolla || (isupportjolla = {}));
var isupportjolla;
(function (isupportjolla) {
    var letters;
    (function (letters) {
        function Init() {
            isupportjolla.letters.BackButton = document.querySelector('div[data-isupportjolla-component="back-button"]');
            isupportjolla.letters.PublishedLetterContainer = document.querySelector('div[data-isupportjolla-component="letter-container"]');
            isupportjolla.letters.PublishedLetter = isupportjolla.letters.PublishedLetterContainer.querySelector('div[data-isupportjolla-component="published-letter"]');
            isupportjolla.letters.PublishedLetterContent = isupportjolla.letters.PublishedLetterContainer.querySelector('div[data-isupportjolla-component="published-letter-content"]');
            isupportjolla.letters.BackButton.addEventListener("click", isupportjolla.letters.HideLetter);
            isupportjolla.letters.LoadLettersUX();
        }
        letters.Init = Init;
        function LoadLettersUX() {
            var LettersUXResponseHandler = function (response) {
                if (typeof response["Error"] == "undefined") {
                    var letterKeys = Object.keys(response);
                    if (letterKeys.length !== 0) {
                        var listItemContainer = document.createElement("div");
                        listItemContainer.setAttribute("data-isupportjolla-component", "letters-list-items");
                        isupportjolla.PrimaryContent.querySelector('div[data-isupportjolla-component="letters-list"]').appendChild(listItemContainer);
                        for (var _i = 0; _i < letterKeys.length; _i++) {
                            var letterId = letterKeys[_i];
                            var letterMetadata = response[letterId];
                            var letterListItem = isupportjolla.letters.CreateLetterListItem(letterMetadata);
                            listItemContainer.insertBefore(letterListItem, listItemContainer.firstChild);
                            letterListItem.querySelector('div[data-isupportjolla-component="letter-metadata"] > span').addEventListener("click", isupportjolla.letters.LoadLetter.bind(this, letterId, letterMetadata));
                        }
                    }
                    else {
                        response["Error"] = "No Letters are currently available.";
                    }
                }
                if (typeof response["Error"] == "string") {
                    var errorElement = isupportjolla.errors.CreateError("server-unreachable", response["Error"]);
                    isupportjolla.PrimaryContent.appendChild(errorElement);
                }
            };
            isupportjolla.net.Request("http://isupportjolla.com/letters-api", "POST", { "Action": "get", "LetterId": "all" }, LettersUXResponseHandler);
        }
        letters.LoadLettersUX = LoadLettersUX;
        function CreateLetterListItem(letterMetadata) {
            var letterListItem = document.createElement("div");
            letterListItem.setAttribute("data-isupportjolla-component", "letters-list-item");
            var letterListItemMetadata = isupportjolla.letters.CreateLetterMetadata(letterMetadata);
            var letterListItemDescription = document.createElement("p");
            letterListItemDescription.textContent = decodeURIComponent(letterMetadata.Description);
            letterListItem.appendChild(letterListItemMetadata);
            letterListItem.appendChild(letterListItemDescription);
            return letterListItem;
        }
        letters.CreateLetterListItem = CreateLetterListItem;
        function CreateLetterMetadata(letterMetadata) {
            var letterListItemMetadata = document.createElement("div");
            letterListItemMetadata.setAttribute("data-isupportjolla-component", "letter-metadata");
            var letterListItemImage = document.createElement("img");
            letterListItemImage.setAttribute("src", letterMetadata.Author.Avatar);
            letterListItemMetadata.appendChild(letterListItemImage);
            var letterListItemTitle = document.createElement("span");
            letterListItemTitle.textContent = letterMetadata.Title;
            letterListItemMetadata.appendChild(letterListItemTitle);
            var letterListItemAuthor = document.createElement("b");
            letterListItemAuthor.textContent = letterMetadata.Author.Name;
            letterListItemMetadata.appendChild(letterListItemAuthor);
            var letterListItemDate = document.createElement("u");
            letterListItemDate.textContent = (new Date(letterMetadata.Date * 1000)).toUTCString();
            letterListItemMetadata.appendChild(letterListItemDate);
            return letterListItemMetadata;
        }
        letters.CreateLetterMetadata = CreateLetterMetadata;
        function LoadLetter(id, letterMetadata) {
            var LetterAPIRequestHandler = function () {
                var LetterMetadata = arguments[0];
                var responseContent = arguments[1];
                if (typeof responseContent !== "object") {
                    var letterMetadataElement = isupportjolla.letters.CreateLetterMetadata(letterMetadata);
                    isupportjolla.letters.PublishedLetter.insertBefore(letterMetadataElement, isupportjolla.letters.PublishedLetterContent);
                    isupportjolla.letters.PublishedLetterContent.innerHTML = responseContent;
                    isupportjolla.PrimaryContent.querySelector('div[data-isupportjolla-component="letters-list-items"]').setAttribute("hide", "");
                    isupportjolla.letters.PublishedLetterContainer.setAttribute("show", "true");
                }
                else {
                    isupportjolla.errors.CreateError("server-unreachable", responseContent["Error"], isupportjolla.PrimaryContent);
                }
            }.bind(this, letterMetadata);
            isupportjolla.net.Request("http://isupportjolla.com/letters-api", "POST", { "Action": "get", "LetterId": id }, LetterAPIRequestHandler);
        }
        letters.LoadLetter = LoadLetter;
        function HideLetter() {
            var errorDivInPrimaryContent = isupportjolla.PrimaryContent.querySelector('div[data-isupportjolla-error]');
            if (errorDivInPrimaryContent !== null) {
                isupportjolla.PrimaryContent.removeChild(errorDivInPrimaryContent);
            }
            else {
                var metadataElement = isupportjolla.letters.PublishedLetter.querySelector('div[data-isupportjolla-component="letter-metadata"]');
                isupportjolla.letters.PublishedLetter.removeChild(metadataElement);
                isupportjolla.letters.PublishedLetterContent.innerHTML = "";
                isupportjolla.PrimaryContent.querySelector('div[data-isupportjolla-component="letters-list-items"]').removeAttribute("hide");
                isupportjolla.letters.PublishedLetterContainer.removeAttribute("show");
            }
        }
        letters.HideLetter = HideLetter;
    })(letters = isupportjolla.letters || (isupportjolla.letters = {}));
})(isupportjolla || (isupportjolla = {}));
var isupportjolla;
(function (isupportjolla) {
    var twitter;
    (function (twitter) {
        twitter.IsTwitterBlockedMessage = "Twitter widget being blocked by browser. Lemme guess, Ghostery?";
        function Init() {
            isupportjolla.twitter.GenerateForm();
            isupportjolla.twitter.FormInput.addEventListener("input", isupportjolla.twitter.TrackInput);
            isupportjolla.twitter.IsTwitterBlocked = !((typeof twttr !== "undefined") && (typeof twttr.widgets !== "undefined"));
            if (window.location.toString().indexOf("sailfish") == -1) {
                isupportjolla.twitter.GenerateTimeline();
            }
            else {
                isupportjolla.twitter.GenerateSailfishPhotoGrid();
            }
        }
        twitter.Init = Init;
        function ActivateLoadPrompt(element, onclickFunc) {
            var loadPromptButton = element.querySelector('div[data-isupportjolla-component="button"][data-is-for-twitter]');
            if (loadPromptButton !== null) {
                var activateWidget = function () {
                    var loadPromptButton = arguments[0];
                    var onclickFunc = arguments[1];
                    loadPromptButton.setAttribute("hide", "true");
                    onclickFunc();
                }.bind(this, loadPromptButton, onclickFunc);
                loadPromptButton.removeAttribute("hide");
                loadPromptButton.addEventListener("click", activateWidget);
            }
        }
        twitter.ActivateLoadPrompt = ActivateLoadPrompt;
        function CreateSailorFeedTimeline() {
            var sailorFeedTimeline = isupportjolla.Sidepane.querySelector('div[data-isupportjolla-component="sailor-feed-timeline"]');
            if (sailorFeedTimeline !== null) {
                if (!isupportjolla.twitter.IsTwitterBlocked) {
                    twttr.widgets.createTimeline('675772340106608640', sailorFeedTimeline, {
                        "height": 400,
                        "border": "#ffffff",
                        "chrome": "noheader,nofooter,noborders,transparent",
                        "tweetLimit": 10
                    });
                }
                else {
                    isupportjolla.errors.CreateError("twttr", isupportjolla.twitter.IsTwitterBlockedMessage, sailorFeedTimeline);
                }
            }
        }
        twitter.CreateSailorFeedTimeline = CreateSailorFeedTimeline;
        function CreateSailfishExperienceTimeline() {
            var sailfishExperienceTimeline = document.querySelector('div[data-isupportjolla-component="sailfish-experience-timeline"]');
            if (sailfishExperienceTimeline !== null) {
                if (!isupportjolla.twitter.IsTwitterBlocked) {
                    twttr.widgets.createGridFromCollection('678194475089444864', sailfishExperienceTimeline, {
                        "height": 400,
                        "border": "#ffffff",
                        "chrome": "noheader,nofooter,noborders,transparent",
                        "tweetLimit": 5,
                        "limit": 5
                    });
                }
                else {
                    isupportjolla.errors.CreateError("twttr", isupportjolla.twitter.IsTwitterBlockedMessage, sailfishExperienceTimeline);
                }
            }
        }
        twitter.CreateSailfishExperienceTimeline = CreateSailfishExperienceTimeline;
        function GenerateForm() {
            isupportjolla.twitter.Form = document.querySelector('div[data-isupportjolla-component="tweet-form"]');
            isupportjolla.twitter.FormInput = document.createElement("textarea");
            isupportjolla.twitter.FormInput.setAttribute("placeholder", "Input positive tweet with #ISupportJolla");
            isupportjolla.twitter.FormInput.setAttribute("maxlength", "140");
            isupportjolla.twitter.FormInput.setAttribute("tabindex", "1");
            isupportjolla.twitter.FormButton = document.createElement("a");
            isupportjolla.twitter.FormButton.setAttribute("target", "_blank");
            isupportjolla.twitter.FormButton.textContent = "Tweet";
            isupportjolla.twitter.FormButton.setAttribute("tabindex", "2");
            isupportjolla.twitter.Form.appendChild(isupportjolla.twitter.FormInput);
            isupportjolla.twitter.Form.appendChild(isupportjolla.twitter.FormButton);
        }
        twitter.GenerateForm = GenerateForm;
        function GenerateSailfishPhotoGrid() {
            var fullWidthElement = document.querySelector('div[data-isupportjolla-component="fullwidth-content"][data-isupportjolla-page="sailfish"]');
            if (isupportjolla.GetPageWidth() > 600) {
                isupportjolla.twitter.CreateSailfishExperienceTimeline();
            }
            else {
                isupportjolla.twitter.ActivateLoadPrompt(fullWidthElement, isupportjolla.twitter.CreateSailfishExperienceTimeline);
            }
        }
        twitter.GenerateSailfishPhotoGrid = GenerateSailfishPhotoGrid;
        function GenerateTimeline() {
            if (isupportjolla.GetPageWidth() > 600) {
                isupportjolla.twitter.CreateSailorFeedTimeline();
            }
            else {
                isupportjolla.twitter.ActivateLoadPrompt(isupportjolla.Sidepane, isupportjolla.twitter.CreateSailorFeedTimeline);
            }
        }
        twitter.GenerateTimeline = GenerateTimeline;
        function TrackInput() {
            if (isupportjolla.twitter.FormInput.value.indexOf("#ISupportJolla") !== -1) {
                var urlEncodedTweetContent = encodeURIComponent(isupportjolla.twitter.FormInput.value);
                var tweetShareLocation = "https://twitter.com/share?related=JoshStrobl" + encodeURIComponent(",") + "JollaHQ&text=" + urlEncodedTweetContent;
                isupportjolla.twitter.FormButton.setAttribute("href", tweetShareLocation);
            }
            else {
                isupportjolla.twitter.FormButton.removeAttribute("href");
            }
        }
        twitter.TrackInput = TrackInput;
    })(twitter = isupportjolla.twitter || (isupportjolla.twitter = {}));
})(isupportjolla || (isupportjolla = {}));
var isupportjolla;
(function (isupportjolla) {
    function Init() {
        isupportjolla.PrimaryContent = document.querySelector('div[data-isupportjolla-component="primary-content"]');
        isupportjolla.Sidepane = document.querySelector('div[data-isupportjolla-component="sidepane"]');
        isupportjolla.twitter.Init();
        if (window.location.toString().indexOf("letters") !== -1) {
            isupportjolla.letters.Init();
        }
    }
    isupportjolla.Init = Init;
    function GetPageWidth() {
        return document.body.getClientRects()[0].width;
    }
    isupportjolla.GetPageWidth = GetPageWidth;
})(isupportjolla || (isupportjolla = {}));
