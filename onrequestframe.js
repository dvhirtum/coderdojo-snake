(function () {
    "use strict";
    var onEachFrame;
    if (window.requestAnimationFrame) {
        onEachFrame = function (callback) {
            var localCallback = function () {
                callback();
                window.requestAnimationFrame(localCallback);
            };
            localCallback();
        };
    } else {
        onEachFrame = function (callback) {
            setInterval(callback, 1000 / 60);
        };
    }
    window.onEachFrame = onEachFrame;
}());