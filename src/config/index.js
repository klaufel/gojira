export const INPUT_FORM = [
  {
    label: "Your JIRA domain",
    name: "basePath",
    placeholder: "https://your-jira.atlassian.net/",
    required: true,
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
    required: true,
    type: "number",
  },
];

export const INPUT_KEYS = INPUT_FORM.map(({ name }) => name);
