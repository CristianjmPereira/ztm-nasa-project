const launches = [
  {
    flightNumber: 1,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    destination: {
      id: 1,
      keplerName: "Kepler-442 b",
    },
    upcoming: true,
    success: true,
  },
  {
    flightNumber: 2,
    mission: "Kepler Exploration Y",
    rocket: "Explorer IS2",
    destination: {
      id: 2,
      keplerName: "Kepler-442 c",
    },
    upcoming: true,
    success: true,
  },
];

async function getAllLaunches() {
  return launches;
}

module.exports = {
  getAllLaunches,
};
