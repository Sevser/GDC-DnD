const createEntry = require("../../common/createEntry");
const spells = require("5e-database/src/5e-SRD-Spells.json");

Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

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

async function createSpells() {
  return Promise.all(
    transformData(spells).map((spell) => {
      return createEntry({
        model: "spell",
        entry: spell,
      });
    })
  );
}

module.exports = createSpells;
