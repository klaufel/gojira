"use strict";

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

const code = `document.querySelectorAll('.ghx-swimlane').forEach(item =>
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

chrome.storage.sync.get(
  ["basePath", "companyName", "companyLogo", "boardId"],
  ({ basePath, companyName, companyLogo, boardId }) => {
    companyInfo.innerHTML = `
      ${companyLogo ? `<img src="${companyLogo}" alt="${companyName}" />` : ""}
      <h1>${companyName || "Jira utils extension"}</h1>
      <span>${basePath || "Needed config yout jira domain"}</span>
    `;

    /*
    document.getElementById("config").onclick = () => {
      document.getElementById("tabs").classList.toggle("is-active");
      document.getElementById("overlay").classList.toggle("is-active");
    };

    document.getElementById("overlay").onclick = () => {
      document.getElementById("tabs").classList.toggle("is-active");
      document.getElementById("overlay").classList.toggle("is-active");
    };*/

    viewSprint.onclick = () => {
      chrome.tabs.create({
        url: `${basePath}/secure/RapidBoard.jspa?rapidView=${boardId}`,
      });
    };

    viewBacklog.onclick = () => {
      chrome.tabs.create({
        url: `${basePath}/secure/RapidBoard.jspa?rapidView=${boardId}&view=planning`,
      });
    };

    viewTask.onsubmit = () => {
      const id = viewTaskId.value;
      chrome.tabs.create({
        url: `${basePath}/secure/QuickSearch.jspa?searchString=${id}`,
      });
    };

    newTask.onclick = () => {
      chrome.windows.create({
        url: `${basePath}/secure/CreateIssue!default.jspa`,
        type: "popup",
        width: 1200,
        height: 800,
        top: 120,
        left: 360,
      });
    };

    expandOpenTasks.onclick = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
          code,
        });
      });
    };

    expandClosedTickets.onclick = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
          code: expandClosedTicketsCode,
        });
      });
    };

    expandAllTickets.onclick = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
          code: expandAllTicketsCode,
        });
      });
    };

    collapseAllTickets.onclick = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
          code: collapseAllTicketsCode,
        });
      });
    };
  }
);
