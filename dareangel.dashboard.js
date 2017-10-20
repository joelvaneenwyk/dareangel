"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("chrome");
window.browser = (function () {
    return window.chrome;
})();
var DareAngel;
(function (DareAngel) {
    class Dashboard {
        constructor(targetDiv) {
            this._imagesList = [];
            this._tabIndex = 2;
            this._canUseWebAudio = false;
            this._targetDiv = targetDiv;
            window.browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                window.browser.tabs.sendMessage(tabs[0].id, { command: "requestImages" }, (response) => {
                    this._imagesList = JSON.parse(response);
                    this._imagesList.forEach((element) => {
                        var newImageHTMLElement = document.createElement("img");
                        newImageHTMLElement.src = element.url;
                        newImageHTMLElement.alt = element.alt;
                        newImageHTMLElement.tabIndex = this._tabIndex;
                        this._tabIndex++;
                        newImageHTMLElement.addEventListener("focus", (event) => {
                        });
                        this._targetDiv.appendChild(newImageHTMLElement);
                    });
                });
            });
        }
    }
    DareAngel.Dashboard = Dashboard;
})(DareAngel = exports.DareAngel || (exports.DareAngel = {}));
//# sourceMappingURL=dareangel.dashboard.js.map