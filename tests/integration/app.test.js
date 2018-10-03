const request = require("supertest");

let app;

const { User } = require("../../models/userModel");

describe("Create a User", () => {
  beforeEach(() => {
    app = require("../../app.js");
    userData = {
      name: "ebuka",
      email: "wes@gmail.com",
      password: "123456"
    };
  });

  afterEach(async () => {
    await User.remove({});
  });

  it("should return 400 for missing input field", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        name: "",
        email: "",
        password: ""
      });

    expect(res.status).toBe(400);
  });

  it("should return 400 for if the name is not more than 5 characters", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        name: "ebu",
        email: "wes@gm.com",
        password: "123456"
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"name" length must be at least 5 characters long');
  });

  it("should return 409 if the email address already exist", async () => {
    await request(app)
      .post("/api/users")
      .send(userData);

    const res = await request(app)
      .post("/api/users")
      .send(userData);

    expect(res.status).toBe(409);
    expect(res.text).toBe("User already registered.");
  });

  it("should return 200 if the user was successfully created", async () => {
    const res = await request(app)
      .post("/api/users")
      .send(userData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "ebuka");
    expect(res.header["x-auth-token"]).toBeTruthy();
  });
});
