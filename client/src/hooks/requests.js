const API_URL = "http://localhost:8000/v1";

async function httpGetPlanets() {
  try {
    const result = await fetch(`${API_URL}/planets`);
    if (!result) {
      throw new Error("Failed to fetch planets");
    }

    const planets = await result.json();
    return planets;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function httpGetLaunches() {
  try {
    const result = await fetch(`${API_URL}/launches`);
    if (!result) {
      throw new Error("Failed to fetch launches");
    }

    const launches = await result.json();
    return launches.sort((a, b) => a.flightNumber - b.flightNumber);
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function httpSubmitLaunch(launch) {
  try {
    const result = await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });

    return {
      ok: result.ok,
      ...(await result.json()),
    };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    const result = await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });

    return {
      ok: result.ok,
      ...(await result.json()),
    };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
