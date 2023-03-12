'use strict';

/**
 * campaign controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::campaign.campaign', 
({ strapi }) => ({
  async find(ctx) {
    ctx.query.populate = {
      index: true,
      name: true,
      desc: true,
    };
    ctx.query.fields = ["index", "id", "name"];
    const { data, meta } = await super.find(ctx);
    return {
      data: data.map((eq) => ({
        ...eq.attributes,
        id: eq.id,
      })),
      meta,
    };
  },
}));
