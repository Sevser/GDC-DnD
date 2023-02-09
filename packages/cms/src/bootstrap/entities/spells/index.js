const createEntry = require("../../common/createEntry");
const spells = require("5e-database/src/5e-SRD-Spells.json");

Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

const getAllSpellSaveDifficultyClass = (abilityScores, createdSpells) => {
  return spells
    .filter((spell) => Reflect.has(spell, "dc"))
    .map((spell) => {
      const sp = createdSpells.find((sp) => sp.index === spell.index);
      const result = {
        desc: spell.dc.desc || "",
        dcSuccess: spell.dc.dc_success,
        abilityScore: null,
        spell: sp,
      };
      const ability = abilityScores.find(
        (ab) => ab.index === spell.dc.dc_type.index
      );
      if (ability) {
        result.abilityScore = ability;
      }
      return result;
    });
};

const calcActionType = (actionRaw) => {
  if (actionRaw === "1 action") {
    return {
      actionType: "Primary",
    };
  } else if (actionRaw.startsWith("1 reaction")) {
    return {
      actionType: "Reaction",
    };
  } else if (actionRaw === "1 bonus action") {
    return {
      actionType: "Secondary",
    };
  }
  return undefined;
};

const transformData = (listResults) =>
  listResults.map((sp, index) => ({
    id: index + 1,
    title: sp.name,
    index: sp.index,
    description: sp.desc.join(", "),
    HighterLevelDescription: sp.higher_level ? sp.higher_level.join(", ") : "",
    Level: sp.level,
    Concentration: sp.concentration,
    activeTime: sp.duration,
    source: { source: "SRD_5E" },
    ActionType: calcActionType(sp.casting_time),
    actionTypeDescription: sp.range,
    SchoolOfMagic: { SchoolOfMagic: sp.school.name },
    SpellComponent: sp.components
      .map((c) => {
        if (c === "V") return "Verbal";
        if (c === "S") return "Somatic";
        return "Material Components";
      })
      .map((s) => ({ SpellComponent: s })),
    spellComponentDescription: sp.material,
    class: sp.classes.map((cl) => ({ class: cl.name })),
    distance: {
      distanceShort: sp.range || "",
      longText: "",
    },
    damageType:
      sp.damage && sp.damage.damage_type
        ? {
            DamageType: sp.damage.damage_type.name,
            CustomDamage: "",
          }
        : null,
  }));

async function createSpells({ abilityScores }) {
  const transformedSpells = transformData(spells);
  const createdSpells = await Promise.all(
    transformedSpells.map((spell) => {
      return createEntry({
        model: "spell",
        entry: spell,
      });
    })
  );
  await Promise.all(
    getAllSpellSaveDifficultyClass(abilityScores, createdSpells).map((ssdc) => {
      return createEntry({
        model: "spell-save-difficulty-class",
        entry: ssdc,
      });
    })
  );
  return createdSpells;
}

module.exports = createSpells;
