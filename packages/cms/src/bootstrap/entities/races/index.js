const createEntry = require("../../common/createEntry");
const races = require("5e-database/src/5e-SRD-Races.json");

const transformRace = (race, props) => ({
  index: race.index,
  name: race.name,
  alignment: race.alignment,
  languageDesc: race.language_desc,
  sizeDescription: race.size_description,
  size: {
    Size: race.size.capitalize(),
  },
  speed: {
    walk: race.speed.toString(),
  },
  abilityBonuses: race.ability_bonuses.map((b) => ({
    bonus: b.bonus,
    abilityScore: props.abilityScores.find(
      (ab) => ab.index === b.ability_score.index
    ),
  })),
  startProficiencies: race.starting_proficiencies.map((prof) =>
    props.proficiencies.find((p) => p.index === prof.index)
  ),
  languages: race.languages.map((lang) =>
    props.languages.find((l) => l.index === lang.index)
  ),
  startingProficiencyOption: race.starting_proficiency_options
    ? {
        choose: race.starting_proficiency_options.choose,
        proficiencies: race.starting_proficiency_options.from.options.map(
          ({ item }) => props.proficiencies.find((p) => p.index === item.index)
        ),
      }
    : null,
});

async function createRaces(props) {
  return Promise.all(
    races.map((race) => {
      return createEntry({
        model: "race",
        entry: transformRace(race, props),
      });
    })
  );
}

module.exports = createRaces;
