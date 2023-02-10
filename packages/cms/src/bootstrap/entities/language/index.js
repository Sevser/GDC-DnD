const createEntry = require("../../common/createEntry");
const languages = require("5e-database/src/5e-SRD-Languages.json");

const tansformLanguage = (trait, props) => ({
  index: trait.index,
  name: trait.name,
  script: trait.script,
  type: trait.type,
});

// todo: typical_speakers

async function createLanguage(props) {
  return Promise.all(
    languages.map((language) => {
      return createEntry({
        model: "language",
        entry: tansformLanguage(language, props),
      });
    })
  );
}

module.exports = createLanguage;
