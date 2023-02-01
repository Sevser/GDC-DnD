const createEntry = require("../../common/createEntry");

async function createArchetypes(archetypes) {
  return Promise.all(
    archetypes.map((arc) => {
      return createEntry({
        model: "archetype",
        entry: arc,
      });
    })
  );
}

module.exports = createArchetypes;
