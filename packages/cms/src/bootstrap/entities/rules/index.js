const createEntry = require("../../common/createEntry");
const rules = require("5e-database/src/5e-SRD-Rules.json");

async function createRules(ruleSections) {
  return Promise.all(
    rules.map((rule) => {
      const newRule = {
        index: rule.index,
        name: rule.name,
        desc: rule.desc,
        ruleSections: ruleSections.filter((ruleSection) =>
          rule.subsections.find(
            (subsection) => subsection.index === ruleSection.index
          )
        ),
      };
      return createEntry({
        model: "rule",
        entry: newRule,
      });
    })
  );
}

module.exports = createRules;
