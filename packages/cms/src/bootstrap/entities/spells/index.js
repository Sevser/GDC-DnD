const createEntry = require("../../common/createEntry");

async function createSpells(spells) {
  return Promise.all(
    spells.map((spell) => {
      return createEntry({
        model: "spell",
        entry: spell,
      });
    })
  );
}

module.exports = createSpells;
