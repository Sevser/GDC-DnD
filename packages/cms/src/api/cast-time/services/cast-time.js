'use strict';

/**
 * cast-time service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cast-time.cast-time');
