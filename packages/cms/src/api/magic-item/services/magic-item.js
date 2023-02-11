'use strict';

/**
 * magic-item service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::magic-item.magic-item');
