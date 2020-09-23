export const executeScript = (script) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.executeScript(tabs[0]?.id, {
      code: script,
    });
  });
};

export const createTab = (url) => chrome.tabs.create({ url });

export const createPopup = (url) => {
  chrome.windows.create({
    url,
    type: "popup",
    width: 1200,
    height: 800,
    top: 120,
    left: 360,
  });
};

export const syncStorage = (keys, callback) => {
  chrome.storage.sync.get(keys, (params) => callback(params));
};
