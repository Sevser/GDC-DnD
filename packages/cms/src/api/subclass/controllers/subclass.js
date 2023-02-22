"use strict";

/**
 * subclass controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::subclass.subclass",
  ({ strapi }) => ({
    async find(ctx) {
      if (!ctx.query.filters.class) {
        return {
          error: "You must specify class",
        };
      }
      const data = await strapi.entityService.findMany(
        "api::subclass.subclass",
        {
          populate: {
            id: true,
            name: true,
            desc: true,
            subclassFlavor: true,
            class: {
              populate: {
                index: true,
              },
            },
            spells: {
              populate: {
                id: true,
                title: true,
                SpellComponent: true,
                Concentration: true,
                class: true,
                ActionType: true,
              },
            },
          },
        }
      );
      return {
        data: data.map((e) => ({
          id: e.id,
          attributes: e,
        })),
      };
    },
  })
);
