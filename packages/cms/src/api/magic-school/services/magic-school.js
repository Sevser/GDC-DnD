'use strict';

/**
 * magic-school service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::magic-school.magic-school');
