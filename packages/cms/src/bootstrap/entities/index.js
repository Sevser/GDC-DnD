const { experience, archetypes } = require("../data/data");
const setPublicPermissions = require("../common/setPublicPermissions");
const createArchetypes = require("./archetypes");
const createDistances = require("./distances");
const createExperience = require("./experience");
const createSpells = require("./spells");
const createBeast = require("./beasts");
const createDamageTypes = require("./damageType");
const createConditions = require("./condition");
const createDictionaries = require("./dictionaries");

async function importSeedData() {
  // Allow read of application content types
  await setPublicPermissions({
    spell: ["find", "findOne"],
    beast: ["find", "findOne"],
    archetype: ["find", "findOne"],
    "base-characteristic": ["find", "findOne"],
    condition: ["find", "findOne"],
    "damage-type-entity": ["find", "findOne"],
    dictionary: ["find", "findOne"],
    experience: ["find", "findOne"],
  });

  // Create all entries
  await createExperience(experience);
  await createArchetypes(archetypes);
  const createdSpells = await createSpells();
  await createBeast();
  await createDamageTypes();
  await createConditions();
  await createDictionaries();
}

module.exports = importSeedData;
