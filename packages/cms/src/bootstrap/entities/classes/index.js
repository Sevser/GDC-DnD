const createEntry = require("../../common/createEntry");
const classes = require("5e-database/src/5e-SRD-Classes.json");
const updateEntry = require("../../common/updateEntry");

const tansformClass = (cl, prop) => {
  return {
    index: cl.index,
    name: cl.name,
    hitDie: cl.hit_die,
    proficiencies: cl.proficiencies.map((p) =>
      prop.proficiencies.find((pr) => pr.index === p.index)
    ),
    startingEquipment:
      cl.starting_equipment &&
      cl.starting_equipment.map((content) => ({
        quantity: content.quantity,
        equipment: prop.equipment.find(
          (equip) => equip.index === content.equipment.index
        ),
      })),
    savingThrows: cl.saving_throws.map((th) =>
      prop.abilityScores.find((a) => a.index === th.index)
    ),
    proficiencyChoices:
      cl.proficiency_choices && cl.proficiency_choices.length
        ? cl.proficiency_choices.map((pc) => ({
            choose: pc.choose,
            desc: pc.desc,
            proficiencies: pc.from.options
              .filter((o) => o.option_type === "reference")
              .map((o) =>
                prop.proficiencies.find((p) => p.index === o.item.index)
              ),
          }))
        : [],
  };
};

async function createClasses(props) {
  return Promise.all(
    classes.map((item) => {
      return createEntry({
        model: "class",
        entry: tansformClass(item, props),
      });
    })
  );
}

module.exports = createClasses;
