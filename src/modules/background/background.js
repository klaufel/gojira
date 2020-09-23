import { _browser } from "../../config/repository.js";

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
