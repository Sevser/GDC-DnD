'use strict';

/**
 * attack router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::attack.attack');
