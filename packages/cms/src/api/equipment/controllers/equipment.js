"use strict";

/**
 * equipment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const mapRelations = (relation) => {
  return {
    id: relation.id,
    ...relation.attributes,
  };
};

module.exports = createCoreController(
  "api::equipment.equipment",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query.populate = {
        index: true,
        name: true,
        equipmentCategory: {
          populate: {
            index: true,
            name: true,
          },
        },
      };
      ctx.query.filters = {
        equipmentCategory: {
          index: {
            $notIn: [
              "armor",
              "light-armor",
              "medium-armor",
              "heavy-armor",
              "shields",
              "weapon",
              "simple-weapons",
              "martial-weapons",
              "melee-weapons",
              "ranged-weapons",
              "simple-melee-weapons",
              "martial-melee-weapons",
              "martial-ranged-weapons",
            ],
          },
        },
      };
      ctx.query.fields = ["index", "id", "name"];
      const { data, meta } = await super.find(ctx);
      return {
        data: data.map((eq) => ({
          ...eq.attributes,
          id: eq.id,
          equipmentCategory: eq.attributes.equipmentCategory
            ? mapRelations(eq.attributes.equipmentCategory.data)
            : null,
        })),
        meta,
      };
    },
    async findOne(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: "*",
      };
      const { data } = await super.findOne(ctx);
      return {
        ...mapRelations(data),
        equipmentCategory:
          data.equipmentCategory && mapRelations(data.equipmentCategory.data),
        gearCategory: data.gearCategory && mapRelations(data.gearCategory.data),
      };
    },
    async findArmor() {
      const armor = await strapi.entityService.findMany(
        "api::equipment.equipment",
        {
          filters: {
            equipmentCategory: {
              index: {
                $in: [
                  "armor",
                  "light-armor",
                  "medium-armor",
                  "heavy-armor",
                  "shields",
                ],
              },
            },
          },
          populate: "*",
        }
      );
      return armor;
    },
    async findWeapon() {
      const armor = await strapi.entityService.findMany(
        "api::equipment.equipment",
        {
          filters: {
            equipmentCategory: {
              index: {
                $in: [
                  "weapon",
                  "simple-weapons",
                  "martial-weapons",
                  "melee-weapons",
                  "ranged-weapons",
                  "simple-melee-weapons",
                  "martial-melee-weapons",
                  "martial-ranged-weapons",
                ],
              },
            },
          },
          populate: "*",
        }
      );
      return armor;
    },
  })
);
