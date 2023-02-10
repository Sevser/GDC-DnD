const createEntry = require("../../common/createEntry");
const categories = require("5e-database/src/5e-SRD-Equipment-Categories.json");

async function createEquipmentCategories() {
  return Promise.all(
    categories.map((category) => {
      return createEntry({
        model: "equipment-category",
        entry: category,
      });
    })
  );
}

module.exports = createEquipmentCategories;
