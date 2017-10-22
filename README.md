# Introduction

The purpose of this example is to showcase a very basic example using TypeScript on how to create an extension that works in multiple browsers. It is based on the DareAngel example, but modified to use more modern constructs (e.g. @types from npm) and strict TypeScript. This example simply does a find/replace on a given page.

Checkout the original article this was inspired by: [Creating an extension for all browsers: Edge, Chrome, Firefox, Opera & Brave](https://www.davrous.com/2016/12/07/creating-an-extension-for-all-browsers-edge-chrome-firefox-opera-brave/ "Creating an extension for all browsers: Edge, Chrome, Firefox, Opera & Brave")

## Setup

This project uses npm @types to install the *.d.ts files and associated dependencies. This was done with commands like:

* npm install @types/chrome --save

This command updates the 'package.json' to add a new dependency.

## Todo

* Add options window and use localStorage (see <http://julip.co/2010/01/how-to-build-a-chrome-extension-part-2-options-and-localstorage/>). Apparently you can also use [Chrome storage](https://stackoverflow.com/questions/28277312/chrome-extensions-saving-settings), but that's browser specific and doesn't seem like the preferrable option.

## Resources

* [Chrome Extension Help](https://developer.chrome.com/extensions/content_scripts)