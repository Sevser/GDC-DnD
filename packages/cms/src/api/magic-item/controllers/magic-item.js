"use strict";

/**
 * magic-item controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::magic-item.magic-item",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query.populate = {
        index: true,
        name: true,
        rarity: true,
        equipmentCategory: {
          populate: {
            index: true,
            name: true,
          },
        },
      };
      ctx.query.fields = ["index", "id", "name", "rarity"];
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
  })
);
