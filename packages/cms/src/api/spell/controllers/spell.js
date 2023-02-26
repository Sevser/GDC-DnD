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
    const spellSaveDifficultyClass = await strapi.entityService.findMany(
      "api::spell-save-difficulty-class.spell-save-difficulty-class",
      {
        filters: {
          spell: {
            id: {
              $eq: data.id,
            },
          },
        },
        fields: ["desc", "dcSuccess", "id"],
      }
    );
    if (distance.length) {
      data.attributes.distance = distance[0];
    } else {
      data.attributes.distance = null;
    }
    console.log(spellSaveDifficultyClass);
    if (spellSaveDifficultyClass.length) {
      const abilityScore = await strapi.entityService.findMany(
        "api::ability-score.ability-score",
        {
          filters: {
            spell_save_difficulty_classes: {
              id: {
                $eq: spellSaveDifficultyClass[0].id,
              },
            },
          },
          fields: ["index", "fullName"],
        }
      );
      data.attributes.spellSaveDifficultyClass = spellSaveDifficultyClass[0];
      data.attributes.spellSaveDifficultyClass.abilityScore = abilityScore[0];
    } else {
      data.attributes.spellSaveDifficultyClass = null;
    }
    data.attributes.classes = data.attributes.classes.data.map((c) => ({
      id: c.id,
      ...c.attributes,
    }));
    data.attributes.archetypes = data.attributes.archetypes.data;
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
        ActionType: true,
        classes: {
          populate: {
            index: true,
            id: true,
            name: true,
          },
        },
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
          classes: item.attributes.classes.data.map((cl) => ({
            ...cl.attributes,
            id: cl.id,
          })),
          ActionType: item.attributes.ActionType,
          Level: item.attributes.Level,
        },
      })),
      meta,
    };
  },
}));
