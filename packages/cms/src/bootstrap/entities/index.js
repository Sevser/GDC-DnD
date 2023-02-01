const createArchetypes = require("./archetypes");
const createDistances = require("./distances");
const createExperience = require("./experience");
const createSpells = require("./spells");
const { experience, archetypes, spells } = require("../data/data");
const setPublicPermissions = require("../common/setPublicPermissions");
const createBeast = require("./beasts");

async function importSeedData() {
  // Allow read of application content types
  await setPublicPermissions({
    spell: ["find", "findOne"],
  });

  // Create all entries
  await createExperience(experience);
  await createArchetypes(archetypes);
  const createdSpells = await createSpells(spells);
  await createDistances(
    spells.map((spell, index) => ({
      ...spell.distance,
      spell: createdSpells[index],
    }))
  );
  await createBeast();
}

module.exports = importSeedData;
