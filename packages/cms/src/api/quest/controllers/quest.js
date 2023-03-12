"use strict";

/**
 * quest controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::quest.quest", ({ strapi }) => ({
  async find(ctx) {
    ctx.query.populate = {
      index: true,
      name: true,
      desc: true,
      tabDesc: true,
    };
    const { data, meta } = await super.find(ctx);
    const campaign = await strapi.entityService.findOne(
      "api::campaign.campaign",
      ctx.query.filters.campaign.id.$eq,
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
}));
