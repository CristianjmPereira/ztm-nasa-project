const { getAllPlanets } = require("./planets.model");

module.exports = {
  Query: {
    planets: async () => {
      console.log("Getting planets");
      return await Promise.resolve(getAllPlanets());
    },
  },
};
