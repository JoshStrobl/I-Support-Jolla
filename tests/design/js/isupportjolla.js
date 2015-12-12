var twttr;
var isupportjolla;
(function (isupportjolla) {
    function generateTweetFormContents() {
        isupportjolla.tweetFormArea = document.querySelector('div[data-isupportjolla-component="tweet-form"]');
        isupportjolla.tweetFormInput = document.createElement("textarea");
        isupportjolla.tweetFormInput.setAttribute("placeholder", "Input positive tweet with #ISupportJolla");
        isupportjolla.tweetFormInput.setAttribute("maxlength", "140");
        isupportjolla.tweetFormButton = document.createElement("a");
        isupportjolla.tweetFormButton.setAttribute("target", "_blank");
        isupportjolla.tweetFormButton.textContent = "Tweet";
        isupportjolla.tweetFormArea.appendChild(isupportjolla.tweetFormInput);
        isupportjolla.tweetFormArea.appendChild(isupportjolla.tweetFormButton);
    }
    isupportjolla.generateTweetFormContents = generateTweetFormContents;
    function generateTwitterTimelines() {
        var sailorFeedTimeline = document.querySelector('div[data-isupportjolla-component="sailor-feed-timeline"]');
        if ((typeof twttr !== "undefined") && (typeof twttr.widgets !== "undefined")) {
            twttr.widgets.createTimeline('675772340106608640', sailorFeedTimeline, {
                "height": 400,
                "border": "#ffffff",
                "chrome": "noheader,nofooter,noborders,transparent",
                "tweetLimit": 15
            });
        }
        else {
            sailorFeedTimeline.setAttribute("data-isupportjolla-error", "twttr");
            sailorFeedTimeline.textContent = "Twitter widget being blocked by browser. Lemme guess, Ghostery?";
        }
    }
    isupportjolla.generateTwitterTimelines = generateTwitterTimelines;
    function trackTextInput() {
        if (isupportjolla.tweetFormInput.value.indexOf("#ISupportJolla") !== -1) {
            var urlEncodedTweetContent = encodeURIComponent(isupportjolla.tweetFormInput.value);
            var tweetShareLocation = "https://twitter.com/share?related=JoshStrobl" + encodeURIComponent(",") + "JollaHQ&text=" + urlEncodedTweetContent;
            isupportjolla.tweetFormButton.setAttribute("href", tweetShareLocation);
        }
        else {
            isupportjolla.tweetFormButton.removeAttribute("href");
        }
    }
    isupportjolla.trackTextInput = trackTextInput;
    function Init() {
        generateTweetFormContents();
        generateTwitterTimelines();
        isupportjolla.tweetFormInput.addEventListener("input", isupportjolla.trackTextInput);
    }
    isupportjolla.Init = Init;
})(isupportjolla || (isupportjolla = {}));
