'use strict';

/**
 * attack service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::attack.attack');
