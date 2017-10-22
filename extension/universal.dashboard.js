"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.browser = (function () {
    return window.chrome;
})();
var UniversalExtension;
(function (UniversalExtension) {
    var Dashboard = /** @class */ (function () {
        function Dashboard(targetDiv) {
            var _this = this;
            this._imagesList = [];
            this._tabIndex = 2;
            this._canUseWebAudio = false;
            this._targetDiv = targetDiv;
            window.browser.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                window.browser.tabs.sendMessage(tabs[0].id, {
                    command: "requestImages"
                }, function (response) {
                    _this._imagesList = JSON.parse(response);
                    _this._imagesList.forEach(function (element) {
                        var newImageHTMLElement = document.createElement("img");
                        newImageHTMLElement.src = element.url;
                        newImageHTMLElement.alt = element.alt;
                        newImageHTMLElement.tabIndex = _this._tabIndex;
                        _this._tabIndex++;
                        newImageHTMLElement.addEventListener("focus", function (event) { });
                        _this._targetDiv.appendChild(newImageHTMLElement);
                    });
                });
            });
        }
        return Dashboard;
    }());
    UniversalExtension.Dashboard = Dashboard;
})(UniversalExtension = exports.UniversalExtension || (exports.UniversalExtension = {}));
//# sourceMappingURL=universal.dashboard.js.map