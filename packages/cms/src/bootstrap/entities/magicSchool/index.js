const createEntry = require("../../common/createEntry");
const magicSchools = require("5e-database/src/5e-SRD-Magic-Schools.json");

async function createMagicSchool() {
  return Promise.all(
    magicSchools.map((ms) => {
      return createEntry({
        model: "magic-school",
        entry: ms,
      });
    })
  );
}

module.exports = createMagicSchool;
