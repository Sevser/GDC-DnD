const createEntry = require("../../common/createEntry");
const ruleSections = require("5e-database/src/5e-SRD-Rule-Sections.json");

async function createRuleSection() {
  return Promise.all(
    ruleSections.map((rule) => {
      return createEntry({
        model: "rule-section",
        entry: rule,
      });
    })
  );
}

module.exports = createRuleSection;
