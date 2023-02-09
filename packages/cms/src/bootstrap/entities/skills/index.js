const createEntry = require("../../common/createEntry");
const skills = require("5e-database/src/5e-SRD-Skills.json");

const transformProp = (prop, abilityScores) => ({
  index: prop.index,
  name: prop.index,
  desc: prop.desc.join(", "),
  abilityScores: abilityScores.find(
    (score) => score.index === prop.ability_score.index
  ),
});

async function createSkills({ abilityScores }) {
  return Promise.all(
    skills.map((skill) => {
      return createEntry({
        model: "skill",
        entry: transformProp(skill, abilityScores),
      });
    })
  );
}

module.exports = createSkills;
