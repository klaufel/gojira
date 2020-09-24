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

const companyInfo = document.querySelector(".company-info");
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#344563">
          <path d="M11.701 16.7a5.002 5.002 0 1 1 0-10.003 5.002 5.002 0 0 1 0 10.004m8.368-3.117a1.995 1.995 0 0 1-1.346-1.885c0-.876.563-1.613 1.345-1.885a.48.48 0 0 0 .315-.574 8.947 8.947 0 0 0-.836-1.993.477.477 0 0 0-.598-.195 2.04 2.04 0 0 1-1.29.08 1.988 1.988 0 0 1-1.404-1.395 2.04 2.04 0 0 1 .076-1.297.478.478 0 0 0-.196-.597 8.98 8.98 0 0 0-1.975-.826.479.479 0 0 0-.574.314 1.995 1.995 0 0 1-1.885 1.346 1.994 1.994 0 0 1-1.884-1.345.482.482 0 0 0-.575-.315c-.708.2-1.379.485-2.004.842a.47.47 0 0 0-.198.582A2.002 2.002 0 0 1 4.445 7.06a.478.478 0 0 0-.595.196 8.946 8.946 0 0 0-.833 1.994.48.48 0 0 0 .308.572 1.995 1.995 0 0 1 1.323 1.877c0 .867-.552 1.599-1.324 1.877a.479.479 0 0 0-.308.57 8.99 8.99 0 0 0 .723 1.79.477.477 0 0 0 .624.194c.595-.273 1.343-.264 2.104.238.117.077.225.185.302.3.527.8.512 1.58.198 2.188a.473.473 0 0 0 .168.628 8.946 8.946 0 0 0 2.11.897.474.474 0 0 0 .57-.313 1.995 1.995 0 0 1 1.886-1.353c.878 0 1.618.567 1.887 1.353a.475.475 0 0 0 .57.313 8.964 8.964 0 0 0 2.084-.883.473.473 0 0 0 .167-.631c-.318-.608-.337-1.393.191-2.195.077-.116.185-.225.302-.302.772-.511 1.527-.513 2.125-.23a.477.477 0 0 0 .628-.19 8.925 8.925 0 0 0 .728-1.793.478.478 0 0 0-.314-.573" />
        </svg>
        <a class="button" href="/src/modules/options/options.html" target="_blank">Configure extension</a>
      </div>
    `;
  }
};

const setHeader = ({ basePath, companyName, companyLogo }) => {
  companyInfo.innerHTML = `
      ${companyLogo ? `<img src="${companyLogo}" alt="${companyName}" />` : ""}
      <h1>${companyName || "JIRA utils extension"}</h1>
      <span>${basePath || "Needed config yout JIRA domain"}</span>
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
