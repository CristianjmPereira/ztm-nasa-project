const {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
} = require("../../models/launches.model");
const { getPagination } = require("../../services/query");

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}

async function httpPostNewLaunch(req, res) {
  const newLaunch = {
    ...req.body,
    launchDate: new Date(req.body.launchDate),
  };

  // console.log(newLaunch);

  if (!newLaunch.mission || !newLaunch.rocket || !newLaunch.destination) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  if (isNaN(newLaunch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  const newAddedLaunch = await addNewLaunch(newLaunch);
  return res.status(200).json(newAddedLaunch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const aborted = await abortLaunch(launchId);

  if (!aborted) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpPostNewLaunch,
  httpAbortLaunch,
};
