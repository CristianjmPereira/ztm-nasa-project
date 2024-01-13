const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Test Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {
    const launchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      destination: "Kepler-62 f",
    };

    const launchDataAfterInsert = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      destination: "Kepler-62 f",
      launchDate: "2028-01-04T03:00:00.000Z",
      customers: ["ZTM", "NASA"],
      upcoming: true,
      success: true,
    };

    test("It should respond with 200 success", async () => {
      launchDataWithoutDate.launchDate = "January 4, 2028";
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(200);

      // expect(response.body).toMatchObject(launchDataAfterInsert);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({
          mission: "USS Enterprise",
          rocket: "NCC 1701-D",
          launchDate: "January 4, 2028",
        })
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({
          mission: "USS Enterprise",
          rocket: "NCC 1701-D",
          destination: "Kepler-62 f",
          launchDate: "zoot",
        })
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
