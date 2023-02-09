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
const createAlignments = require("./alignments");
const createMagicSchool = require("./magicSchool");
const createWeaponProperty = require("./weaponProperty");
const createProficiencies = require("./proficiencies");
const createAbilityScore = require("./abilityScores");
const createSkills = require("./skills");

async function importSeedData() {
  await setPublicPermissions({
    spell: ["find", "findOne"],
    beast: ["find", "findOne"],
    archetype: ["find", "findOne"],
    "base-characteristic": ["find", "findOne"],
    condition: ["find", "findOne"],
    "damage-type-entity": ["find", "findOne"],
    dictionary: ["find", "findOne"],
    experience: ["find", "findOne"],
    alignment: ["find", "findOne"],
    "magic-school": ["find", "findOne"],
    "weapon-property": ["find", "findOne"],
    proficiency: ["find", "findOne"],
    "ability-score": ["find", "findOne"],
    skill: ["find", "findOne"],
  });

  // Create all entries
  await createExperience(experience);
  await createArchetypes(archetypes);
  await createBeast();
  await createDamageTypes();
  await createConditions();
  await createDictionaries();
  await createAlignments();
  await createMagicSchool();
  await createWeaponProperty();
  await createProficiencies();
  const abilityScores = await createAbilityScore();
  await createSkills({ abilityScores });
  const createdSpells = await createSpells({ abilityScores });
}

module.exports = importSeedData;
