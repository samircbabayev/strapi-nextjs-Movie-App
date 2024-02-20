"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async findMany(ctx) {
    try {
      const data = await strapi.entityService.findMany("api::product.product", {
        fields: ["id", "name", "price"],
      });
      ctx.body = data;
    } catch (error) {
      ctx.body = error;
    }
  },
}));
