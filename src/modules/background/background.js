import { _browser, syncStorage, createTab } from "../../config/repository.js";
import routes from "../../config/routes.js";

_browser.runtime.onInstalled.addListener(() => {
  _browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
    _browser.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new _browser.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: "" },
          }),
        ],
        actions: [new _browser.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

const initOmnibox = ({ basePath }) => {
  if (basePath) {
    _browser.omnibox.onInputEntered.addListener((input) => {
      createTab(
        routes("SEARCH")
          .replace("%{basePath}", basePath)
          .replace("%{id}", input)
      );
    });
  }
};

document.addEventListener("DOMContentLoaded", () =>
  syncStorage(["basePath"], initOmnibox)
);
