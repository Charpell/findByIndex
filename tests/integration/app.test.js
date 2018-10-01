const request = require("supertest");
const app = require("../../app");

describe("Home Page", () => {
  it("should return 200 if a valid request", done => {
    request(app)
      .get("/")
      .expect(200)
      .end(done);
  });
});
