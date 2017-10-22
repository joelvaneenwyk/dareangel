(<any>window).browser = (function () {
  return window.chrome;
})();

export module UniversalExtension {
  export class Dashboard {
    private _targetDiv: HTMLElement;
    private _imagesList = [];
    private _tabIndex = 2;
    private _canUseWebAudio = false;
    private _audioContext: AudioContext;

    constructor(targetDiv: HTMLElement) {
      this._targetDiv = targetDiv;

      (<any>window).browser.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs) => {
        (<any>window).browser.tabs.sendMessage(tabs[0].id, {
          command: "requestImages"
        }, (response) => {
          this._imagesList = JSON.parse(response);
          this._imagesList.forEach((element) => {
            var newImageHTMLElement = document.createElement("img");
            newImageHTMLElement.src = element.url;
            newImageHTMLElement.alt = element.alt;
            newImageHTMLElement.tabIndex = this._tabIndex;
            this._tabIndex++;
            newImageHTMLElement.addEventListener("focus", (event) => {});
            this._targetDiv.appendChild(newImageHTMLElement);
          });
        });
      });
    }
  }
}