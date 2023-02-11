const createEntry = require("../../common/createEntry");
const updateEntry = require("../../common/updateEntry");
const equipment = require("5e-database/src/5e-SRD-Equipment.json");

const transformEquipment = (eq, props) => {
  return {
    index: eq.index,
    name: eq.name,
    categoryRange: eq.category_range || "",
    weaponCategory: eq.weapon_category || "",
    weaponRange: eq.weapon_range || "",
    weight: eq.weight,
    desc: eq.desc && eq.desc.join(", "),
    cost: eq.cost,
    strMinimum: eq.str_minimum,
    stealthDisadvantage: eq.stealth_disadvantage,
    quantity: eq.quantity,
    capacity: eq.capacity,
    toolCategory: eq.tool_category,
    vehicleCategory: eq.vehicle_category,
    armorCategory: eq.armor_category,
    special: eq.special && eq.special.join(", "),
    equipmentCategory:
      eq.equipment_category &&
      props.eqCategories.find((e) => e.index === eq.equipment_category.index),
    weaponProperties: (eq.properties || []).map((prop) =>
      props.weaponProperties.find((wp) => wp.index === prop.index)
    ),
    gearCategory:
      eq.gear_category &&
      props.eqCategories.find((e) => e.index === eq.gear_category.index),
    damage: eq.damage
      ? {
          damageDice: eq.damage.damage_dice,
          damageType: props.damageTypes.find(
            (dt) => dt.index === eq.damage.damage_type.index
          ),
        }
      : null,
    range: eq.range,
    throwRange: eq.throw_range,
    speed: eq.speed,
    twoHandedDamage: eq.two_handed_damage
      ? {
          damageDice: eq.two_handed_damage.damage_dice,
          damageType: props.damageTypes.find(
            (dt) => dt.index === eq.two_handed_damage.damage_type.index
          ),
        }
      : null,
    armorClassEquipment: eq.armor_class
      ? {
          base: eq.armor_class.base,
          dexBonus: eq.armor_class.dex_bonus,
          maxBonus: eq.armor_class.max_bonus,
        }
      : null,
  };
};

async function createEquipment(props) {
  const createdEquipment = await Promise.all(
    equipment.map((eq) => {
      return createEntry({
        model: "equipment",
        entry: transformEquipment(eq, props),
      });
    })
  );
  const equipmentWithContents = equipment.filter(
    (eq) => eq.contents && eq.contents.length
  );
  await Promise.all(
    equipmentWithContents.map((eq) => {
      const oldEquipment = createdEquipment.find(
        (equip) => equip.index === eq.index
      );
      oldEquipment.contents = eq.contents.map((content) => ({
        quantity: content.quantity,
        equipment: createdEquipment.find(
          (equip) => equip.index === content.item.index
        ),
      }));
      return updateEntry({
        model: "equipment",
        entry: oldEquipment,
      });
    })
  );
  return createdEquipment;
}

module.exports = createEquipment;
