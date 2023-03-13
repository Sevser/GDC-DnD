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
      const quest = await strapi.entityService.findOne(
        "api::quest.quest",
        ctx.query.filters.quest.id.$eq,
        {
          populate: "*",
        }
      );
      const campaign = await strapi.entityService.findOne(
        "api::campaign.campaign",
        quest.id,
        {
          populate: "*",
        }
      );
      const { auth } = ctx.state;
      return {
        data: data.map((eq) => ({
          ...eq.attributes,
          id: eq.id,
        })),
        meta: {
          ...meta,
          canEdit: campaign.DM.id === auth.credentials.id,
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
