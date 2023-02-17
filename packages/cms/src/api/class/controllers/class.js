"use strict";

/**
 * class controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::class.class", ({ strapi }) => ({
  async findOne(ctx) {
    const data = await strapi.entityService.findOne(
      "api::class.class",
      ctx.params.id,
      {
        populate: {
          index: true,
          name: true,
          hitDie: true,
          proficiencyChoices: {
            populate: "*",
          },
          proficiencies: {
            populate: "*",
          },
          savingThrows: {
            populate: "*",
          },
          startingEquipment: {
            id: true,
            bonus: true,
            populate: {
              abilityScore: true,
            },
          },
        },
      }
    );
    return {
      data: {
        id: data.id,
        attributes: data,
      },
    };
  },
}));
