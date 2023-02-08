const createEntry = require("../../common/createEntry");
const dictionaries = require("./dictionaries");

async function createDictionaries() {
  return Promise.all(
    dictionaries.map(async (dictionary) => {
      return createEntry({
        model: "dictionary",
        entry: dictionary,
      });
    })
  );
}

module.exports = createDictionaries;
