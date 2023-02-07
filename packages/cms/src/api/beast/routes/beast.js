'use strict';

/**
 * beast router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::beast.beast');
