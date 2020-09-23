import { INPUT_FORM, INPUT_KEYS } from "./config/index.js";

const configForm = document.getElementById("configForm");
const messages = document.getElementById("messages");
const formOptions = document.getElementById("form");

const getDomainUrl = (url) => {
  const split = url?.split("/");
  return `${split[0]}//${url?.match("//") ? split[2] : split[0]}`;
};

const genForm = (values) => {
  formOptions.innerHTML = INPUT_FORM.map(
    ({ name, label, type, placeholder, required }) => `
        <div class="form-control">
          <label for="${name}">${label}</label>
          <input
            id="${name}"
            name="${name}"
            placeholder="${placeholder || ""}"
            type="${type || "text"}"
            value="${values?.[name] || ""}"
            ${required && `required`}
          />
        </div> 
      `
  );
};

const loadConfig = () => {
  chrome.storage.sync.get(INPUT_KEYS, (values) => genForm(values));
};

const saveConfig = () => {
  configForm.addEventListener("submit", (event) => {
    event.preventDefault();
    messages.innerHTML = "";

    chrome.storage.sync.set(
      {
        basePath: getDomainUrl(document.getElementById("basePath")?.value),
        companyName: document.getElementById("companyName")?.value,
        companyLogo: document.getElementById("companyLogo")?.value,
        boardId: document.getElementById("boardId")?.value,
      },
      () => {
        messages.innerHTML = "<span>Config updated!</span>";
        setTimeout(() => (messages.innerHTML = ""), 1000);
      }
    );
  });
};

document.addEventListener("DOMContentLoaded", () => {
  loadConfig();
  saveConfig();
});
