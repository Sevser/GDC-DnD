'use strict';

/**
 * beast service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::beast.beast');
