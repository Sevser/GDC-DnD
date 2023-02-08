const createEntry = require("../../common/createEntry");
const properties = require("5e-database/src/5e-SRD-Weapon-Properties.json");

const transformProp = (prop) => ({
  index: prop.index,
  name: prop.index,
  desc: prop.desc.join(", "),
});

async function createWeaponProperty(experience) {
  return Promise.all(
    properties.map((prop) => {
      return createEntry({
        model: "weapon-property",
        entry: transformProp(prop),
      });
    })
  );
}

module.exports = createWeaponProperty;
