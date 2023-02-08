const createArchetypes = require("./archetypes");
const createDistances = require("./distances");
const createExperience = require("./experience");
const createSpells = require("./spells");
const { experience, archetypes } = require("../data/data");
const setPublicPermissions = require("../common/setPublicPermissions");
const createBeast = require("./beasts");
const createDamageTypes = require("./damageType");
const createConditions = require("./condition");

async function importSeedData() {
  // Allow read of application content types
  await setPublicPermissions({
    spell: ["find", "findOne"],
    beast: ["find", "findOne"],
  });

  // Create all entries
  await createExperience(experience);
  await createArchetypes(archetypes);
  const createdSpells = await createSpells();
  await createBeast();
  await createDamageTypes();
  await createConditions();
}

module.exports = importSeedData;
