const createEntry = require("../../common/createEntry");
const damageTypes = require("5e-database/src/5e-SRD-Damage-Types.json");

async function createDamageTypes() {
  return Promise.all(
    damageTypes.map(async (damage) => {
      return createEntry({
        model: "damage-type-entity",
        entry: {
          name: damage.name,
          index: damage.index,
          desc: damage.desc.join(", "),
        },
      });
    })
  );
}

module.exports = createDamageTypes;
