const createEntry = require("../../common/createEntry");
const subraces = require("5e-database/src/5e-SRD-Subraces.json");

const transformSubrace = (subrace, props) => ({
  index: subrace.index,
  name: subrace.name,
  desc: subrace.desc,
  race: props.races.find((r) => r.index === subrace.race.index),
  abilityBonuses: subrace.ability_bonuses.map((b) => ({
    bonus: b.bonus,
    abilityScore: props.abilityScores.find(
      (ab) => ab.index === b.ability_score.index
    ),
  })),
  startProficiencies: subrace.starting_proficiencies.map((prof) =>
    props.proficiencies.find((p) => p.index === prof.index)
  ),
  racialTraits: subrace.racial_traits.map((tr) =>
    props.traits.find((t) => t.index === tr.index)
  ),
});

async function createSubraces(props) {
  return Promise.all(
    subraces.map((subrace) => {
      return createEntry({
        model: "subrace",
        entry: transformSubrace(subrace, props),
      });
    })
  );
}

module.exports = createSubraces;
