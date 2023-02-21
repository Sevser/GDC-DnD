"use strict";

/**
 * level controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::level.level", ({ strapi }) => ({
  async find(ctx) {
    if (!ctx.filters.class) {
      return {
        error: "you must specify class",
      };
    }
    const data = await strapi.entityService.findMany("api::level.level", {
      filters: ctx.filters,
      populate: {
        id: true,
        index: true,
        name: true,
        level: true,
        profBonus: true,
        spellcasting: {
          cantripsKnown: true,
          spellsKnown: true,
          spellSlotsLevel1: true,
          spellSlotsLevel2: true,
          spellSlotsLevel3: true,
          spellSlotsLevel4: true,
          spellSlotsLevel5: true,
          spellSlotsLevel6: true,
          spellSlotsLevel7: true,
          spellSlotsLevel8: true,
          spellSlotsLevel9: true,
        },
        features: {
          populate: {
            index: true,
            name: true,
          },
        },
      },
    });
    return {
      data: data.map((e) => ({
        id: e.id,
        attributes: e,
      })),
    };
  },
}));
