const createEntry = require("../../common/createEntry");
const traits = require("5e-database/src/5e-SRD-Traits.json");

const transformTrait = (trait, props) => ({
  index: trait.index,
  name: trait.name,
  desc: trait.desc.join(", "),
  races: trait.races.map((rc) => props.races.find((r) => r.index === rc.index)),
  proficiencies: trait.proficiencies.map((pr) =>
    props.proficiencies.find((p) => p.index === pr.index)
  ),
  proficiencyChoise: trait.proficiency_choices
    ? {
        choose: trait.proficiency_choices.choose,
        proficiencies: trait.proficiency_choices.from.options.map((o) =>
          props.proficiencies.find((p) => p.index === o.item.index)
        ),
      }
    : null,
});

// todo: trait_specific, subraces

async function createTraits(props) {
  return Promise.all(
    traits.map((trait) => {
      return createEntry({
        model: "trait",
        entry: transformTrait(trait, props),
      });
    })
  );
}

module.exports = createTraits;
