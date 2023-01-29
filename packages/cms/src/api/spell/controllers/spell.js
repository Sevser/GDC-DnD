"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

/*
 find: 200: {
        title: true,
        SpellComponent: true,
        Concentration: true,
        class: true,
        ActionType: true,
        Level: true,
      }
*/

module.exports = createCoreController("api::spell.spell", ({ strapi }) => ({
  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      local: "en",
      populate: "*",
    };
    const { data, meta } = await super.findOne(ctx);
    const distance = await strapi.entityService.findMany(
      "api::distance.distance",
      {
        filters: {
          spell: {
            id: {
              $eq: data.id,
            },
          },
        },
        fields: ["distanceShort", "longText", "id"],
      }
    );
    if (distance.length) {
      data.attributes.distance = distance[0];
    } else {
      data.attributes.distance = null;
    }
    return { data, meta };
  },
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
