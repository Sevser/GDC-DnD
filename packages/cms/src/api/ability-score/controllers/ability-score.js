"use strict";

/**
 * ability-score controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::ability-score.ability-score",
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
            skills: item.attributes.skills.data.map((skill) => ({
              ...skill.attributes,
              id: skill.id,
            })),
          },
        })),
        meta,
      };
    },
  })
);
