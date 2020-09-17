"use strict";

const configForm = document.getElementById("configForm");
const jiraBasePath = document.getElementById("jiraBasePath");
const jiraCompanyName = document.getElementById("jiraCompanyName");
const jiraCompanyLogo = document.getElementById("jiraCompanyLogo");

chrome.storage.sync.get(
  ["basePath", "companyName", "companyLogo"],
  ({ basePath, companyName, companyLogo }) => {
    jiraBasePath.setAttribute("value", basePath || "");
    jiraCompanyName.setAttribute("value", companyName || "");
    jiraCompanyLogo.setAttribute("value", companyLogo || "");
  }
);

configForm.onsubmit = (event) => {
  event.preventDefault();
  const jiraBasePathValue = jiraBasePath?.value;
  const jiraCompanyNameValue = jiraCompanyName?.value;
  const jiraCompanyLogoValue = jiraCompanyLogo?.value;

  chrome.storage.sync.set({
    basePath: jiraBasePathValue,
    companyName: jiraCompanyNameValue,
    companyLogo: jiraCompanyLogoValue,
  });
};
