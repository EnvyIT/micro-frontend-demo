const fs = require("fs-extra");
const concat = require("concat");

const outputFolder = "elements";
const srcFolder = "./dist/gender-widget/";

(async function build() {
  const files = [
    `${srcFolder}/runtime.js`,
    `${srcFolder}/polyfills.js`,
    `${srcFolder}/main.js`,
  ];
  await fs.ensureDir(outputFolder);
  await concat(files, `${outputFolder}/chart.js`);
  await fs.copy(`${srcFolder}/styles.css`, `${outputFolder}/styles.css`);
  await fs.copy(`${srcFolder}/assets`, `${outputFolder}/assets`);
})();
