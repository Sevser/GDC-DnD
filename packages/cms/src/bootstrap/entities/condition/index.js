const createEntry = require("../../common/createEntry");
const conditions = require("5e-database/src/5e-SRD-Conditions.json");

async function createConditions() {
  return Promise.all(
    conditions.map(async (condition) => {
      return createEntry({
        model: "condition",
        entry: {
          name: condition.name,
          index: condition.index,
          desc: condition.desc.join(", "),
        },
      });
    })
  );
}

module.exports = createConditions;
