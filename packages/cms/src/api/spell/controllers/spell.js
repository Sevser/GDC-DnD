"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

/*
 200: {
        title: true,
        SpellComponent: true,
        Concentration: true,
        class: true,
        ActionType: true,
        Level: true,
      }
*/

module.exports = createCoreController("api::spell.spell", ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      local: "en",
      populate: {
        title: true,
        SpellComponent: true,
        Concentration: true,
        class: true,
        ActionType: true,
      },
    };

    const { data, meta } = await super.find(ctx);

    meta.allowedFieldSort = ["title", "Level"];

    return {
      data: data.map((item) => ({
        id: item.id,
        attributes: {
          title: item.attributes.title,
          SpellComponent: item.attributes.SpellComponent,
          Concentration: item.attributes.Concentration,
          class: item.attributes.class,
          ActionType: item.attributes.ActionType,
          Level: item.attributes.Level,
        },
      })),
      meta,
    };
  },
}));
