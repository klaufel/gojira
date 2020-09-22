const INPUT_FORM = [
  {
    label: "Your JIRA domain",
    name: "basePath",
    placeholder: "https://your-jira.atlassian.net/",
    type: "url",
  },
  {
    label: "Your company name",
    name: "companyName",
  },
  {
    label: "Company logo URL",
    name: "companyLogo",
    placeholder: "https://...../logo.png",
    type: "url",
  },
  {
    label: "Board ID",
    name: "boardId",
    placeholder: "Number in url ...RapidBoard.jspa?rapidView=4471",
    type: "number",
  },
];

const INPUT_KEYS = INPUT_FORM.map(({ name }) => name);

const configForm = document.getElementById("configForm");
const messages = document.getElementById("messages");
const form = document.getElementById("form");

const genForm = (values) =>
  (form.innerHTML = INPUT_FORM.map(
    ({ name, label, type, placeholder }) => `
        <div class="form-control">
          <label for="${name}">${label}</label>
          <input
            value="${values?.[name] || ""}"
            type="${type || "text"}"
            name="${name}"
            id="${name}"
            placeholder="${placeholder || ""}"
          />
        </div> 
      `
  ));

chrome.storage.sync.get(INPUT_KEYS, (values) => genForm(values));

configForm.onsubmit = (event) => {
  event.preventDefault();
  messages.innerHTML = "";

  chrome.storage.sync.set(
    {
      basePath: document.getElementById("basePath")?.value,
      companyName: document.getElementById("companyName")?.value,
      companyLogo: document.getElementById("companyLogo")?.value,
      boardId: document.getElementById("boardId")?.value,
    },
    () => (messages.innerHTML = "<span>Config updated!</span>")
  );
};
