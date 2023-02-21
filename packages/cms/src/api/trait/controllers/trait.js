"use strict";

/**
 * trait controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::trait.trait", ({ strapi }) => ({
  async find() {
    const data = await strapi.entityService.findMany("api::trait.trait", {
      populate: {
        id: true,
        name: true,
        index: true,
        desc: true,
        races: {
          populate: {
            id: true,
            name: true,
            index: true,
          },
        },
        proficiencies: {
          populate: {
            id: true,
            name: true,
            index: true,
          },
        },
        subraces: {
          populate: {
            id: true,
            name: true,
            index: true,
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
