'use strict';

/**
 * attack controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::attack.attack');
