const request = require("supertest");

const { users, posts, postThreeId } = require("../seed");
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

describe("Get posts", () => {
  beforeEach(async () => {
    await Post.insertMany(posts);
  });

  it("should return 404 if no post found", async () => {
    const res = await request(app).get("/api/posts/5bc259266d2022c8e1fd4e39");

    expect(res.status).toBe(404);
  });

  it("should return 404 for invalid ID", async () => {
    const res = await request(app).get("/api/posts/333");

    expect(res.status).toBe(400);
  });

  it("should get one post", async () => {
    const res = await request(app).get(`/api/posts/${posts[0]._id}`);

    expect(res.status).toBe(200);
  });

  it("should get all the meals", async () => {
    const res = await request(app).get("/api/posts");

    expect(res.status).toBe(200);
  });
});

describe("Update a Post", () => {
  beforeEach(async () => {
    await Post.insertMany(posts);
  });

  it("should return 401 if user is not authenticated", async () => {
    const res = await request(app)
      .patch(`/api/posts/${posts[0]._id}`)
      .send({
        content: "This is the second Post"
      });

    expect(res.status).toBe(401);
  });

  it("should return 400 for missing content field", async () => {
    const res = await request(app)
      .patch(`/api/posts/${posts[0]._id}`)
      .set("x-auth-token", users[1].token)
      .send();

    expect(res.status).toBe(400);
  });

  it("should return 400 for empty content field", async () => {
    const res = await request(app)
      .patch(`/api/posts/${posts[0]._id}`)
      .set("x-auth-token", users[1].token)
      .send({
        content: ""
      });

    expect(res.status).toBe(400);
  });

  it("should return 403 if the user is not the creator of the post", async () => {
    const res = await request(app)
      .patch(`/api/posts/${posts[0]._id}`)
      .set("x-auth-token", users[1].token)
      .send({
        content: "This is the second Post"
      });

    expect(res.status).toBe(403);
  });

  it("should return 200 if the post is successfully updated", async () => {
    const res = await request(app)
      .patch(`/api/posts/${posts[0]._id}`)
      .set("x-auth-token", users[0].token)
      .send({
        content: "This is the second Post"
      });

    expect(res.status).toBe(200);
  });
});

describe("Delete a post", async () => {
  beforeEach(async () => {
    await Post.insertMany(posts);
  });

  it("should return 401 if user is not authenticated", async () => {
    const res = await request(app).delete(`/api/posts/${posts[0]._id}`);

    expect(res.status).toBe(401);
  });

  it("should return 400 if the post id is not valid", async () => {
    const res = await request(app)
      .delete(`/api/posts/123456`)
      .set("x-auth-token", users[1].token);

    expect(res.status).toBe(400);
  });

  it("should return 404 if the post is not found", async () => {
    const res = await request(app)
      .delete(`/api/posts/${postThreeId}`)
      .set("x-auth-token", users[0].token);

    expect(res.status).toBe(404);
  });

  it("should return 403 if the user is not the creator of the post", async () => {
    const res = await request(app)
      .delete(`/api/posts/${posts[0]._id}`)
      .set("x-auth-token", users[2].token);

    expect(res.status).toBe(403);
  });

  it("should return 200 if the the post was successfully deleted", async () => {
    const res = await request(app)
      .delete(`/api/posts/${posts[0]._id}`)
      .set("x-auth-token", users[0].token);

    expect(res.status).toBe(200);
  });
});
