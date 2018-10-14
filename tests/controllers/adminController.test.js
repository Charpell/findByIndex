const request = require("supertest");

const { users, userOneId, userfourId } = require("../seed");
const { User } = require("../../models/userModel");

let app;

describe("Get users", () => {
  beforeEach(async () => {
    app = require("../../app");
    await User.insertMany(users);
  });

  it("should return all the users", async () => {
    const res = await request(app).get("/api/admin/users");

    expect(res.status).toBe(200);
  });

  it("should return 200 when a user is found", async () => {
    console.log("User One Id", userOneId);
    const res = await request(app).get(`/api/admin/users/${userOneId}`);

    expect(res.status).toBe(200);
  });
});

describe("Get a user", () => {
  it("should return 400 if the user id is not valid", async () => {
    const res = await request(app).get(`/api/admin/users/123456`);

    expect(res.status).toBe(400);
  });

  it("should return 404 if the user is not found", async () => {
    const res = await request(app).get(`/api/admin/users/${userfourId}`);

    expect(res.status).toBe(404);
  });
});
