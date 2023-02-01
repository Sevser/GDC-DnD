const createEntry = require("../../common/createEntry");
const axios = require("axios");

const transformBeast = (beastRaw) => {
  const beast = {
    hit_points: beastRaw.hit_points,
    hit_dice: beastRaw.hit_dice,
    hit_points_roll: beastRaw.hit_points_roll,
    Size: {
      Size: beastRaw.size,
    },
    speed: beastRaw.speed,
    name: beastRaw.name,
    xp: beastRaw.xp,
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
  };

  return beast;
};
async function createBeast() {
  try {
    const beasts = await axios.get(
      "https://raw.githubusercontent.com/Sevser/5e-database/main/src/5e-SRD-Monsters.json"
    );
    return Promise.all(
      beasts.data.map((beastRaw) => {
        return createEntry({
          model: "beast",
          entry: transformBeast(beastRaw),
        });
      })
    );
  } catch (e) {
    console.log(e);
  }
}

module.exports = createBeast;
