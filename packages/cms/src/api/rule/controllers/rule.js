"use strict";

/**
 * rule controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::rule.rule", () => ({
  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      local: "en",
      populate: "*",
    };
    const { data, meta } = await super.findOne(ctx);
    const ruleSections = await strapi.entityService.findMany(
      "api::rule-section.rule-section",
      {
        filters: {
          rules: {
            id: {
              $eq: data.id,
            },
          },
        },
        fields: ["name", "index", "desc"],
      }
    );
    data.attributes.ruleSections = ruleSections;
    return { data, meta };
  },
}));
