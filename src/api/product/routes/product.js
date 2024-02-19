"use strict";

/**
 * product router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::product.product");

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/products",
      handler: "product.findMany",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
