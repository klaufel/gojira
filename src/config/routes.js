const routes = {
  BACKLOG:
    "%{basePath}/secure/RapidBoard.jspa?rapidView=%{boardId}&view=planning",
  NEW_ISSUE: "%{basePath}/secure/CreateIssue!default.jspa",
  SEARCH: "%{basePath}/secure/QuickSearch.jspa?searchString=%{id}",
  SPRINT: "%{basePath}/secure/RapidBoard.jspa?rapidView=%{boardId}",
};

export default (key) => routes[key];
