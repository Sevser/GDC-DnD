"use strict";

/**
 * equipment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

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
      ctx.query.fields = ["index", "id", "name"];
      const { data, meta } = await super.find(ctx);
      return {
        data: data.map((eq) => ({
          ...eq.attributes,
          id: eq.id,
          equipmentCategory: eq.attributes.equipmentCategory
            ? {
                id: eq.attributes.equipmentCategory.data.id,
                ...eq.attributes.equipmentCategory.data.attributes,
              }
            : null,
        })),
        meta,
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
