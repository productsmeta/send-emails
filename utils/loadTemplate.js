const fs = require("fs");
const path = require("path");

const loadEmailTemplate = (templateName, replacements = {}) => {
  const templatePath = path.join(
    __dirname,
    templateName
  );

  let html = fs.readFileSync(templatePath, "utf8");

  Object.keys(replacements).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    html = html.replace(regex, replacements[key]);
  });

  return html;
};

module.exports = loadEmailTemplate;
