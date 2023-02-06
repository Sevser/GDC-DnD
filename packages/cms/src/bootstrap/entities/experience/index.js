const createEntry = require("../../common/createEntry");

async function createExperience(experience) {
  return Promise.all(
    experience.map((exp) => {
      return createEntry({
        model: "experience",
        entry: exp,
      });
    })
  );
}

module.exports = createExperience;
