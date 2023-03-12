"use strict";

/**
 * campaign controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::campaign.campaign",
  ({ strapi }) => ({
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
        const { auth } = ctx.state;
        const model = ctx.request.body.data;
        const result = await strapi.entityService.create(
          "api::campaign.campaign",
          {
            data: {
              ...model,
              DM: auth.credentials,
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
