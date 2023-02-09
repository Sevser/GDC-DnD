const createEntry = require("../../common/createEntry");
const abilityScores = require("5e-database/src/5e-SRD-Ability-Scores.json");

const transformProp = (prop) => ({
  index: prop.index,
  name: prop.index,
  fullName: prop.full_name,
  desc: prop.desc.join(", "),
});

async function createAbilityScore() {
  return Promise.all(
    abilityScores.map((abilityScore) => {
      return createEntry({
        model: "ability-score",
        entry: transformProp(abilityScore),
      });
    })
  );
}

module.exports = createAbilityScore;
