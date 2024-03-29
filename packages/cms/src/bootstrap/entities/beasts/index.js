const createEntry = require("../../common/createEntry");
const createInstanceBaseCharacteristics = require("../baseCharacteristics/createInstanceBaseCharacteristics");
const bestiary = require("5e-database/src/5e-SRD-Monsters.json");

const checkForDamageType = (val) => {
  return (
    [
      "Acid",
      "Bludgeoning",
      "Cold",
      "Fire",
      "Force",
      "Lightning",
      "Necrotic",
      "Piercing",
      "Poison",
      "Psychic",
      "Radiant",
      "Slashing",
      "Thunder",
    ].indexOf(val) !== -1
  );
};

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
            condition: armor.condition
              ? {
                  name: armor.condition.name,
                  index: armor.condition.index,
                }
              : null,
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
    damageImmunities: beastRaw.damage_immunities.map((item) => {
      if (checkForDamageType(item.capitalize())) {
        return {
          DamageType: item.capitalize(),
          CustomDamage: "",
        };
      } else {
        return {
          DamageType: "None",
          CustomDamage: item.capitalize(),
        };
      }
    }),
    damageResistances: beastRaw.damage_resistances.map((item) => {
      if (checkForDamageType(item.capitalize())) {
        return {
          DamageType: item.capitalize(),
          CustomDamage: "",
        };
      } else {
        return {
          DamageType: "None",
          CustomDamage: item.capitalize(),
        };
      }
    }),
    damageVulnerabilities: beastRaw.damage_vulnerabilities.map((item) => {
      if (checkForDamageType(item.capitalize())) {
        return {
          DamageType: item.capitalize(),
          CustomDamage: "",
        };
      } else {
        return {
          DamageType: "None",
          CustomDamage: item.capitalize(),
        };
      }
    }),
    specialAbilities:
      beastRaw.special_abilities && beastRaw.special_abilities.length
        ? beastRaw.special_abilities.map((action) => ({
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
    return Promise.all(
      bestiary.map(async (beastRaw) => {
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
