"use strict";

/**
 * beast controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::beast.beast", ({ strapi }) => ({
  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      local: "en",
      populate: "*",
    };

    const result = await super.findOne(ctx);
    const base_characteristic = await strapi.entityService.findMany(
      "api::base-characteristic.base-characteristic",
      {
        filters: {
          beast: {
            id: {
              $eq: result.data.id,
            },
          },
        },
        fields: "*",
      }
    );
    if (base_characteristic && base_characteristic.length) {
      result.data.attributes.base_characteristic = base_characteristic[0];
    } else {
      result.data.attributes.base_characteristic = {};
    }

    return result;
  },
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      local: "en",
      populate: {
        name: true,
        Size: true,
        alignment: true,
        challenge_rating: true,
        type: true,
      },
    };

    const { data, meta } = await super.find(ctx);

    meta.allowedFieldSort = ["challenge_rating", "Size"];

    return {
      data: data.map((item) => ({
        id: item.id,
        attributes: {
          name: item.attributes.name,
          Size: item.attributes.Size,
          alignment: item.attributes.alignment,
          challenge_rating: item.attributes.challenge_rating,
          type: item.attributes.type,
        },
      })),
      meta,
    };
  },
}));
