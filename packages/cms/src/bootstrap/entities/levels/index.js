const createEntry = require("../../common/createEntry");
const levels = require("5e-database/src/5e-SRD-Levels.json");

const transformItem = (level, props) => {
  return {
    index: level.index,
    name: level.name,
    level: level.level,
    class:
      level.class &&
      level.class.index &&
      props.classes.find((cl) => cl.index === level.class.index),
    subclass:
      level.subclass &&
      level.subclass.index &&
      props.subclasses.find((cl) => cl.index === level.subclass.index),
    profBonus: level.profBonus,
    features: level.features.map((f) =>
      props.features.find((ft) => ft.index === f.index)
    ),
    spellcasting: level.spellcasting
      ? {
          cantripsKnown: level.spellcasting.cantrips_known || 0,
          spellsKnown: level.spellcasting.spells_known || 0,
          spellSlotsLevel1: level.spellcasting.spell_slots_level_1 || 0,
          spellSlotsLevel2: level.spellcasting.spell_slots_level_2 || 0,
          spellSlotsLevel3: level.spellcasting.spell_slots_level_3 || 0,
          spellSlotsLevel4: level.spellcasting.spell_slots_level_4 || 0,
          spellSlotsLevel5: level.spellcasting.spell_slots_level_5 || 0,
          spellSlotsLevel6: level.spellcasting.spell_slots_level_6 || 0,
          spellSlotsLevel7: level.spellcasting.spell_slots_level_7 || 0,
          spellSlotsLevel8: level.spellcasting.spell_slots_level_8 || 0,
          spellSlotsLevel9: level.spellcasting.spell_slots_level_9 || 0,
        }
      : null,
    index: level.index,
    index: level.index,
  };
};

async function createLevels(props) {
  return Promise.all(
    levels.map((level) => {
      return createEntry({
        model: "level",
        entry: transformItem(level, props),
      });
    })
  );
}

module.exports = createLevels;
