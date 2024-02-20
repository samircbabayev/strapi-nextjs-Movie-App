module.exports = {
  routes: [
    {
      method: "GET",
      path: "/dog",
      handler: "dog.exampleAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
