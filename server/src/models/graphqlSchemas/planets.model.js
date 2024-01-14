const planets = [
  {
    id: 1,
    keplerName: "Kepler-442 b",
  },
  {
    id: 2,
    keplerName: "Kepler-442 c",
  },
];

async function getAllPlanets() {
  return planets;
}

module.exports = {
  getAllPlanets,
};
