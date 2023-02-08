"use strict";

/**
 * proficiency controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::proficiency.proficiency",
  ({ strapi }) => ({
    async find() {
      const proficiencies = await strapi.entityService.findMany(
        "api::proficiency.proficiency",
        {
          start: 0,
          limit: -1,
          populate: "*",
        }
      );

      return {
        data: proficiencies.map((attributes) => ({ attributes })),
      };
    },
  })
);
