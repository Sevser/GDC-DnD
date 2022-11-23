'use strict';

/**
 * cast-time router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::cast-time.cast-time');
