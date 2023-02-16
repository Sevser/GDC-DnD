"use strict";

/**
 * race controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::race.race", ({ strapi }) => ({
  async find() {
    const data = await strapi.entityService.findMany("api::race.race", {
      populate: {
        id: true,
        name: true,
        abilityBonuses: {
          id: true,
          bonus: true,
          populate: {
            abilityScore: true,
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
  async findOne(ctx) {
    const data = await strapi.entityService.findOne(
      "api::race.race",
      ctx.params.id,
      {
        populate: {
          index: true,
          name: true,
          alignment: true,
          languageDesc: true,
          ize: true,
          sizeDescription: true,
          speed: true,
          size: {
            populate: "*",
          },
          startProficiencies: {
            populate: "*",
          },
          traits: {
            populate: "*",
          },
          languages: {
            populate: "*",
          },
          startingProficiencyOption: {
            populate: "*",
          },
          subraces: {
            populate: "*",
          },
          abilityBonuses: {
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
