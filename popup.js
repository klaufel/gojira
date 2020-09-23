import {
  executeScript,
  createTab,
  createPopup,
  syncStorage,
} from "./config/chromeRepository.js";

const expandOpenTasks = document.getElementById("expandOpenTasks");
const expandClosedTickets = document.getElementById("expandClosedTickets");
const expandAllTickets = document.getElementById("expandAllTickets");
const collapseAllTickets = document.getElementById("collapseAllTickets");

const newTask = document.getElementById("newTask");
const viewSprint = document.getElementById("viewSprint");
const viewBacklog = document.getElementById("viewBacklog");
const viewTask = document.getElementById("viewTask");
const viewTaskId = document.getElementById("viewTaskId");
const companyInfo = document.getElementById("companyInfo");

const expandOpenTicketsCode = `document.querySelectorAll('.ghx-swimlane').forEach(item =>
  item.querySelectorAll('.ghx-swimlane-header.ghx-done')?.length === 0
    ? item.classList.remove('ghx-closed')
    : item.classList.add('ghx-closed')
)`;

const expandClosedTicketsCode = `document.querySelectorAll('.ghx-swimlane').forEach(item =>
  item.querySelectorAll('.ghx-swimlane-header.ghx-done')?.length === 0
    ? item.classList.add('ghx-closed')
    : item.classList.remove('ghx-closed')
)`;

const expandAllTicketsCode = `document.querySelectorAll('.ghx-swimlane').forEach(
  item => item.classList.remove('ghx-closed')
)`;

const collapseAllTicketsCode = `document.querySelectorAll('.ghx-swimlane').forEach(
  item => item.classList.add('ghx-closed')
)`;

const setListeners = ({ basePath, boardId }) => {
  viewSprint.addEventListener("click", () =>
    createTab(`${basePath}/secure/RapidBoard.jspa?rapidView=${boardId}`)
  );

  viewBacklog.addEventListener("click", () =>
    createTab(
      `${basePath}/secure/RapidBoard.jspa?rapidView=${boardId}&view=planning`
    )
  );

  viewTask.addEventListener("submit", () => {
    const id = viewTaskId?.value;
    createTab(`${basePath}/secure/QuickSearch.jspa?searchString=${id}`);
  });

  newTask.addEventListener("click", () =>
    createPopup(`${basePath}/secure/CreateIssue!default.jspa`)
  );

  expandOpenTasks.addEventListener("click", () =>
    executeScript(expandOpenTicketsCode)
  );

  expandClosedTickets.addEventListener("click", () =>
    executeScript(expandClosedTicketsCode)
  );

  expandAllTickets.addEventListener("click", () =>
    executeScript(expandAllTicketsCode)
  );

  collapseAllTickets.addEventListener("click", () =>
    executeScript(collapseAllTicketsCode)
  );
};

const setHeader = ({ basePath, companyName, companyLogo }) => {
  companyInfo.innerHTML = `
      ${companyLogo ? `<img src="${companyLogo}" alt="${companyName}" />` : ""}
      <h1>${companyName || "Jira utils extension"}</h1>
      <span>${basePath || "Needed config yout jira domain"}</span>
    `;
};

const init = (params) => {
  setHeader(params);
  setListeners(params);
};

document.addEventListener("DOMContentLoaded", () =>
  syncStorage(["basePath", "companyName", "companyLogo", "boardId"], init)
);
