const { getAllLaunches, addNewLaunch } = require("../launches.model");

module.exports = {
  Query: {
    launches: async () => {
      console.log("Getting launches");
      const launches = await getAllLaunches();
      console.log("Graphql launches: ", launches);
      return launches;
    },
    launchesByDate: async (_, { from, to }) => {
      console.log("Getting launches by date");
      const launches = await getAllLaunches();
      return launches.filter(
        (launch) => launch.launchDate >= from && launch.launchDate <= to
      );
    },
    launchesSortedByDate: async (_, { order }) => {
      console.log("Getting launches by date");
      const launches = await getAllLaunches();
      return order === "asc"
        ? launches.sort((a, b) => a.launchDate - b.launchDate)
        : launches.sort((a, b) => b.launchDate - a.launchDate);
    },
  },
  Mutation: {
    addNewLaunch: async (_, { launch }) => {
      console.log("Adding new launch", launch);
      const newLaunch = await addNewLaunch(launch);
      return newLaunch;
    },
  },
};
