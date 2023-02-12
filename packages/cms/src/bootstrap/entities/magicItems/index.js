const createEntry = require("../../common/createEntry");
const magicItems = require("5e-database/src/5e-SRD-Magic-Items.json");
const updateEntry = require("../../common/updateEntry");

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
  const items = await Promise.all(
    magicItems.map((item) => {
      return createEntry({
        model: "magic-item",
        entry: tansformItem(item, props),
      });
    })
  );
  const itemsWithVariants = magicItems.filter(
    (item) => item.variants && item.variants.length
  );
  await Promise.all(
    itemsWithVariants.map((item) => {
      const magicItem = items.find((i) => i.index === item.index);
      magicItem.variants = {
        magicItems: item.variants.map((i) =>
          items.find((it) => it.index === i.index)
        ),
      };
      return updateEntry({
        model: "magic-item",
        entry: magicItem,
      });
    })
  );
  return items;
}

module.exports = createMagicItems;
