"use strict";

/**
 * spell controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::spell.spell", ({ strapi }) => ({
  async find(ctx) {
    ctx.query = { ...ctx.query, local: "en", populate: "*" };

    const { data, meta } = await super.find(ctx);

    meta.date = Date.now();

    return { data, meta };
  },
}));
