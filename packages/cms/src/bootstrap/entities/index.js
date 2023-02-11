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
const createRuleSection = require("./ruleSection");
const createRules = require("./rules");
const createRaces = require("./races");
const createTraits = require("./traits");
const createLanguage = require("./language");
const createSubraces = require("./subrace");
const createEquipmentCategories = require("./equipmentCategories");
const createEquipment = require("./equipment");
const createMagicItems = require("./magic-items");

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
    "rule-section": ["find", "findOne"],
    skill: ["find", "findOne"],
    rules: ["find", "findOne"],
    race: ["find", "findOne"],
    trait: ["find", "findOne"],
    language: ["find", "findOne"],
    subrace: ["find", "findOne"],
    "equipment-category": ["find", "findOne"],
    equipment: ["find", "findOne"],
  });

  // Create all entries
  await createExperience(experience);
  await createArchetypes(archetypes);
  const abilityScores = await createAbilityScore();
  const proficiencies = await createProficiencies();
  const languages = await createLanguage();
  const races = await createRaces({ abilityScores, proficiencies, languages });
  const traits = await createTraits({ races, proficiencies });
  await createBeast();
  await createSubraces({ races, abilityScores, traits, proficiencies });
  const eqCategories = await createEquipmentCategories();
  const damageTypes = await createDamageTypes();
  await createConditions();
  await createDictionaries();
  await createAlignments();
  await createMagicSchool();
  const weaponProperties = await createWeaponProperty();
  await createSkills({ abilityScores });
  const createdSpells = await createSpells({ abilityScores });
  const ruleSections = await createRuleSection();
  await createRules(ruleSections);
  await createEquipment({
    eqCategories,
    weaponProperties,
    damageTypes,
  });
  await createMagicItems({
    eqCategories,
  });
}

module.exports = importSeedData;
