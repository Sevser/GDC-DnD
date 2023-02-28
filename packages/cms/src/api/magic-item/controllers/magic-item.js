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
    async findOne(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {
          index: true,
          name: true,
          rarity: true,
          desc: true,
          variants: {
            populate: {
              magicItems: {
                populate: {
                  index: true,
                  name: true,
                  rarity: true,
                  equipmentCategory: {
                    populate: {
                      index: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
          equipmentCategory: {
            populate: {
              index: true,
              name: true,
            },
          },
        },
      };
      const { data } = await super.findOne(ctx);
      return {
        ...data.attributes,
        id: data.id,
        equipmentCategory: data.attributes.equipmentCategory
          ? {
              id: data.attributes.equipmentCategory.data.id,
              ...data.attributes.equipmentCategory.data.attributes,
            }
          : null,
        variants:
          (data.attributes.variants &&
            data.attributes.variants.magicItems &&
            data.attributes.variants.magicItems.data &&
            data.attributes.variants.magicItems.data.map((mi) => ({
              id: mi.id,
              ...mi.attributes,
              equipmentCategory: mi.attributes.equipmentCategory
                ? {
                    id: mi.attributes.equipmentCategory.data.id,
                    ...mi.attributes.equipmentCategory.data.attributes,
                  }
                : null,
            }))) ||
          [],
      };
    },
  })
);
