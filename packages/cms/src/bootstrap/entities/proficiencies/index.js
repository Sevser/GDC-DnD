const createEntry = require("../../common/createEntry");
const proficiencies = require("5e-database/src/5e-SRD-Proficiencies.json");

const transformProp = (prop, races) => ({
  index: prop.index,
  name: prop.name,
  type: prop.type,
  classes: prop.classes.map((cl) => ({
    class: cl.name,
  })),
});

async function createProficiencies() {
  return Promise.all(
    proficiencies.map((proficiency) => {
      return createEntry({
        model: "proficiency",
        entry: transformProp(proficiency),
      });
    })
  );
}

module.exports = createProficiencies;
