"use strict";

/**
 * quest-episode controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::quest-episode.quest-episode",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query.populate = {
        index: true,
        name: true,
      };
      const { data, meta } = await super.find(ctx);
      return {
        data: data.map((eq) => ({
          ...eq.attributes,
          id: eq.id,
        })),
        meta: {
          ...meta,
        },
      };
    },
    async create(ctx) {
      try {
        const model = ctx.request.body.data;
        const result = await strapi.entityService.create(
          "api::quest-episode.quest-episode",
          {
            data: {
              ...model.questEpisode,
              quest: {
                id: model.questId,
              },
            },
          }
        );
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
