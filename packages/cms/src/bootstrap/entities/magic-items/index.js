const createEntry = require("../../common/createEntry");
const magicItems = require("5e-database/src/5e-SRD-Magic-Items.json");

const tansformItem = (item, props) => ({
  index: item.index,
  name: item.name,
  desc: item.desc && item.desc.join(", "),
  rarity: item.rarity && item.rarity.name,
  equipmentCategory: item.equipment_category
    ? props.eqCategories.find(
        (eq) => eq.index === item.equipment_category.index
      )
    : null,
  variant: item.variant,
});

async function createMagicItems(props) {
  return Promise.all(
    magicItems.map((item) => {
      return createEntry({
        model: "magic-item",
        entry: tansformItem(item, props),
      });
    })
  );
}

module.exports = createMagicItems;
