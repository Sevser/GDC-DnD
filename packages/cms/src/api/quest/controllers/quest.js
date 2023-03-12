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
    return {
      data: data.map((eq) => ({
        ...eq.attributes,
        id: eq.id,
      })),
      meta,
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
