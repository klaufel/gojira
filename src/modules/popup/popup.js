import routes from "../../config/routes.js";
import {
  executeScript,
  createTab,
  createPopup,
  syncStorage,
} from "../../config/repository.js";

const searchIssue = document.querySelector(".js-search-issue");
const searchIssueId = document.querySelector(".js-search-issue-id");

const newIssue = document.querySelector(".js-new-issue");
const viewSprint = document.querySelector(".js-view-sprint");
const viewBacklog = document.querySelector(".js-view-backlog");

const expandOpenIssues = document.querySelector(".js-expand-open-issues");
const expandClosedIssues = document.querySelector(".js-expand-closed-issues");
const expandAllIssues = document.querySelector(".js-expand-all-issues");
const collapseAllIssues = document.querySelector(".js-collapse-all-issues");

const header = document.querySelector(".header");
const actionsContainer = document.querySelector(".actions");

const expandOpenIssuesCode = `document.querySelectorAll('.ghx-swimlane').forEach(item =>
  item.querySelectorAll('.ghx-swimlane-header.ghx-done')?.length === 0
    ? item.classList.remove('ghx-closed')
    : item.classList.add('ghx-closed')
)`;

const expandClosedIssuesCode = `document.querySelectorAll('.ghx-swimlane').forEach(item =>
  item.querySelectorAll('.ghx-swimlane-header.ghx-done')?.length === 0
    ? item.classList.add('ghx-closed')
    : item.classList.remove('ghx-closed')
)`;

const expandAllIssuesCode = `document.querySelectorAll('.ghx-swimlane').forEach(
  item => item.classList.remove('ghx-closed')
)`;

const collapseAllIssuesCode = `document.querySelectorAll('.ghx-swimlane').forEach(
  item => item.classList.add('ghx-closed')
)`;

const setListeners = ({ basePath, boardId }) => {
  if (basePath && boardId) {
    viewSprint.addEventListener("click", () =>
      createTab(
        routes("SPRINT")
          .replace("%{basePath}", basePath)
          .replace("%{boardId}", boardId)
      )
    );

    viewBacklog.addEventListener("click", () =>
      createTab(
        routes("BACKLOG")
          .replace("%{basePath}", basePath)
          .replace("%{boardId}", boardId)
      )
    );

    searchIssue.addEventListener("submit", () => {
      const id = searchIssueId?.value;
      createTab(
        routes("SEARCH").replace("%{basePath}", basePath).replace("%{id}", id)
      );
    });

    newIssue.addEventListener("click", () =>
      createPopup(routes("NEW_ISSUE").replace("%{basePath}", basePath))
    );

    expandOpenIssues.addEventListener("click", () =>
      executeScript(expandOpenIssuesCode)
    );

    expandClosedIssues.addEventListener("click", () =>
      executeScript(expandClosedIssuesCode)
    );

    expandAllIssues.addEventListener("click", () =>
      executeScript(expandAllIssuesCode)
    );

    collapseAllIssues.addEventListener("click", () =>
      executeScript(collapseAllIssuesCode)
    );
  } else {
    actionsContainer.innerHTML = `
      <div class="actions-config">
        <svg width="16px" height="16px" viewBox="0 0 16 16" fill="#344563">
          <path fill-rule="evenodd" d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"/>
          <path fill-rule="evenodd" d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"/>
        </svg>
        <a class="button" href="/src/modules/options/options.html" target="_blank">Configure extension</a>
      </div>
    `;
  }
};

const setHeader = ({ basePath, companyName, companyLogo }) => {
  header.innerHTML = `
      ${
        companyLogo
          ? `<img class="header__logo" src="${companyLogo}" alt="${companyName}" />`
          : ""
      }
      <h1 class="header__title">${companyName || "JIRA utils extension"}</h1>
      <span class="header__description">${
        basePath || "Needed config JIRA domain"
      }</span>
    `;
};

const init = (params) => {
  setHeader(params);
  setListeners(params);
};

document.addEventListener("DOMContentLoaded", () =>
  syncStorage(["basePath", "companyName", "companyLogo", "boardId"], init)
);

document.addEventListener("DOMContentLoaded", () => {
  searchIssueId.focus();
});
