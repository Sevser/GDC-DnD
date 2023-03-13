"use strict";

/**
 * quest-event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::quest-event.quest-event",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query.populate = {
        index: true,
        name: true,
      };
      const { data, meta } = await super.find(ctx);
      const questEpisode = await strapi.entityService.findOne(
        "api::quest-episode.quest-episode",
        ctx.query.filters.questEpisode.id.$eq,
        {
          populate: "*",
        }
      );
      const campaign = await strapi.entityService.findOne(
        "api::campaign.campaign",
        questEpisode.quest.id,
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
          "api::quest-event.quest-event",
          {
            data: {
              ...model.event,
              questEpisode: {
                id: model.episodeId,
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
