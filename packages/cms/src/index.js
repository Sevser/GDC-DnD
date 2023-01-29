"use strict";
const boostrap = require("./bootstrap/index");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  async bootstrap() {
    await boostrap();
  },
};
