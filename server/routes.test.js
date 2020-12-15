const express = require("express");
const routes = require("./routes");
const request = require("supertest");
const app = express();

app.use("/recipestags/:tags", routes);
describe("testing getRelevantTags", () => {
  it("GET /recipestags", async () => {
    const { body } = await request(app).get("/recipestags/bear"); //uses the request function that calls on express app instance
    expect(body).toHaveLength(6);
  });
});