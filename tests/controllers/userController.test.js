const request = require("supertest");
const mongoose = require("mongoose");

let app;

const { User } = require("../../models/userModel");

const userData = {
  name: "ebuka",
  email: "wes@gmail.com",
  password: "123456"
};

describe("Create a User", () => {
  beforeEach(() => {
    app = require("../../app");
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
        email: "wes@gm.comn",
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

describe("Login", () => {
  beforeEach(async () => {
    app = require("../../app");
    await request(app)
      .post("/api/users")
      .send(userData);
  });

  it("should return 400 for missing email field", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "",
        password: "123456"
      });

    expect(res.status).toBe(400);
  });

  it("should return 400 for missing password field", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "wes@gmail.com",
        password: ""
      });

    expect(res.status).toBe(400);
  });

  it("should return 400 for if the email or password is incorrect", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "wes@gm.comn",
        password: "123456"
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe(
      '{"status":400,"message":"Incorrect email or password"}'
    );
  });

  it("should return 200 if the user was successfully logged in", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "wes@gmail.com",
        password: "123456"
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "ebuka");
    expect(res.header["x-auth-token"]).toBeTruthy();
  });
});

describe("Activate Vendor Mode", () => {
  let user;
  beforeEach(async () => {
    user = await request(app)
      .post("/api/users")
      .send({
        name: "felix",
        email: "fgfh@gsjhd.com",
        password: "123456"
      });
  });

  it("should change the user's role to vendor", async () => {
    const res = await request(app)
      .patch("/api/users/vendor")
      .set("x-auth-token", user.headers["x-auth-token"]);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ response: "Vendor Mode Activated" });
  });
});
