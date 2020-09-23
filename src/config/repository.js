export const _browser = chrome || browser;

export const _storage = _browser.storage.sync || _browser.storage.local;

export const syncStorage = (keys, callback) => {
  _storage.get(keys, (params) => callback(params));
};

export const createTab = (url) => _browser.tabs.create({ url });

export const createPopup = (url) => {
  const [width, height] = [1200, 800];
  _browser.windows.create({
    height,
    left: width / 4,
    top: height / 4,
    type: "popup",
    url,
    width,
  });
};

export const executeScript = (code) => {
  _browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    _browser.tabs.executeScript(tabs[0]?.id, { code });
  });
};
