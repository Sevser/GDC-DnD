"use strict";

/**
 * skill controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::skill.skill",

  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        local: "en",
        populate: "*",
      };

      const { data, meta } = await super.find(ctx);

      return {
        data: data.map((item) => ({
          attributes: {
            ...item.attributes,
            ability: item.attributes.abilityScores.data[0]
              ? {
                  ...item.attributes.abilityScores.data[0].attributes,
                  id: item.attributes.abilityScores.data[0].id,
                }
              : null,
          },
        })),
        meta,
      };
    },
  })
);
