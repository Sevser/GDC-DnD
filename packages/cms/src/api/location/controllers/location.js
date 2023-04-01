"use strict";

/**
 * location controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::location.location",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const model = ctx.request.body.data;
        const result = await strapi.entityService.create("api::quest.quest", {
          data: {
            ...model.quest,
            campaign: {
              id: model.campaignId,
            },
          },
        });
        return {
          result,
        };
      } catch (error) {
        return {
          error,
        };
      }
    },
  })
);
