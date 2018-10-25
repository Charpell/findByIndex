const request = require("supertest");

const { users, posts } = require("../seed");
const { Post } = require("../../models/postModel");

let app;

beforeEach(async () => {
  app = require("../../app");
});

afterEach(async () => {
  await Post.remove();
});

describe("Create a Post", () => {
  it("should return 401 if user is not authenticated", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({
        content: "This is the first Post"
      });

    expect(res.status).toBe(401);
  });

  it("should return 400 for missing content field", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("x-auth-token", users[1].token)
      .send();

    expect(res.status).toBe(400);
  });

  it("should return 400 for empty content field", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("x-auth-token", users[1].token)
      .send({
        content: ""
      });

    expect(res.status).toBe(400);
  });

  it("should return 201 if the post is successfully created", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("x-auth-token", users[1].token)
      .send({
        content: "This is the first Post"
      });

    expect(res.status).toBe(201);
  });
});
