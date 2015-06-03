(function () {
    "use strict";
    function timestamp() {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }
    window.timestamp = timestamp;
}());