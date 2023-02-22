"use strict";

/**
 * equipment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::equipment.equipment",
  ({ strapi }) => ({
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
  })
);
