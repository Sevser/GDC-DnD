const createEntry = require("../../common/createEntry");

async function createInstanceBaseCharacteristics(baseCharacteristics) {
  return createEntry({
    model: "base-characteristic",
    entry: baseCharacteristics,
  });
}

module.exports = createInstanceBaseCharacteristics;
