'use strict';

/**
 * ability-score service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ability-score.ability-score');
