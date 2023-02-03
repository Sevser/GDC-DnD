const createEntry = require("../../common/createEntry");
const axios = require("axios");
const createInstanceBaseCharacteristics = require("../baseCharacteristics/createInstanceBaseCharacteristics");
const experience = require("./experienceToDangereouse");

const transformBeast = async (beastRaw) => {
  const baseCharacteristics = await createInstanceBaseCharacteristics({
    Strength: beastRaw.strength,
    Dexterity: beastRaw.dexterity,
    Constitution: beastRaw.constitution,
    Intelligence: beastRaw.intelligence,
    Wisdom: beastRaw.wisdom,
    Charisma: beastRaw.charisma,
    CharismaMaster: false,
    WisdomMaster: false,
    IntelligenceMaster: false,
    ConstitutionMaster: false,
    DexterityMaster: false,
    StrengthMaster: false,
  });

  const beast = {
    hit_points: beastRaw.hit_points,
    hit_dice: beastRaw.hit_dice,
    hit_points_roll: beastRaw.hit_points_roll,
    Size: {
      Size: beastRaw.size,
    },
    base_characteristic: baseCharacteristics,
    speed: beastRaw.speed,
    name: beastRaw.name,
    xp: beastRaw.xp,
    type: beastRaw.type,
    challenge_rating: beastRaw.challenge_rating,
    languages: beastRaw.languages,
    alignment: {
      alignment: beastRaw.alignment,
    },
    senses: beastRaw.senses,
    armorClass:
      beastRaw.armor_class && beastRaw.armor_class.length
        ? beastRaw.armor_class.map((armor) => ({
            type: armor.type,
            value: armor.value,
          }))
        : [],
    actions:
      beastRaw.actions && beastRaw.actions.length
        ? beastRaw.actions.map((action) => ({
            name: action.name,
            desc: action.desc,
            action_options: action.action_options,
            attack_bonus: action.attack_bonus,
            usage: action.usage ? JSON.stringify(action.usage) : undefined,
            dc: action.dc ? JSON.stringify(action.dc) : undefined,
            actions: action.actions
              ? JSON.stringify(action.actions)
              : undefined,
            damage: action.damage ? JSON.stringify(action.damage) : undefined,
            options: action.options
              ? JSON.stringify(action.options)
              : undefined,
            attacks: action.attacks
              ? JSON.stringify(action.attacks)
              : undefined,
            action_options: action.action_options
              ? JSON.stringify(action.action_options)
              : undefined,
          }))
        : [],
    legendaryAction:
      beastRaw.legendary_actions && beastRaw.legendary_actions.length
        ? beastRaw.legendary_actions.map((action) => ({
            name: action.name,
            desc: action.desc,
            attack_bonus: action.attack_bonus,
            dc: action.dc ? JSON.stringify(action.dc) : undefined,
            damage: action.damage ? JSON.stringify(action.damage) : undefined,
          }))
        : [],
  };

  return beast;
};
async function createBeast() {
  try {
    const beasts = await axios.get(
      "https://raw.githubusercontent.com/Sevser/5e-database/main/src/5e-SRD-Monsters.json"
    );
    return Promise.all(
      beasts.data.map(async (beastRaw) => {
        return createEntry({
          model: "beast",
          entry: await transformBeast(beastRaw),
        });
      })
    );
  } catch (e) {
    console.log(e);
  }
}

module.exports = createBeast;
