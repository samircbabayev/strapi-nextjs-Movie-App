"use strict";

const { entityService } = require("@strapi/strapi").factories;

/**
 * A set of functions called "actions" for `dog`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    try {
      const data = await strapi.entityService.findMany("api::product.product", {
        fields: ["id", "name", "price"],
      });
      //ctx.body = "hello dog world";
      //ctx.body = data;
      return data;
    } catch (err) {
      ctx.body = err;
    }
  },
};
