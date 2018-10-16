const request = require("supertest");

const { users, posts } = require("../seed");
const { Post } = require("../../models/postModel");
const { User } = require("../../models/userModel");

let app;

beforeEach(async () => {
  app = require("../../app");
  await Post.insertMany(posts);
});

afterEach(async () => {
  await Post.remove({});
});

describe("Create posts", () => {
  it("should return 401 if the user is not authenticated", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({
        name: "Kingsley",
        content: "The first content",
        avatar: "the avatar",
        user: users[3]._id
      });

    expect(res.status).toBe(401);
  });

  it("should return 400 for missing content field", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("x-auth-token", users[3].token)
      .send({
        name: "Kingsley",
        avatar: "the avatar",
        user: users[3]._id
      });

    expect(res.status).toBe(400);
  });

  it("should return 400 for empty content field", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("x-auth-token", users[3].token)
      .send({
        name: "Kingsley",
        content: "",
        avatar: "the avatar",
        user: users[3]._id
      });

    expect(res.status).toBe(400);
  });

  it("should return 201 if the post is successfully created", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("x-auth-token", users[3].token)
      .send({
        content: "The first content"
      });

    expect(res.status).toBe(201);
  });
});

describe("Get posts", () => {
  it("should return status code of 404 if no post found", async () => {
    const res = await request(app).get("/api/posts/5bc259266d2022c8e1fd4e39");

    expect(res.status).toBe(404);
  });

  it("should get one post", async () => {
    const res = await request(app).get(`/api/posts/${posts[0]._id}`);

    expect(res.status).toBe(200);
  });

  it("should get all the meals", async () => {
    const res = await request(app).get("/api/posts");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});

describe("Update a Post", () => {
  it("should return 401 if user is not authenticated", async () => {
    const res = await request(app)
      .patch(`/api/posts/${posts[0]._id}`)
      .send({
        content: "The first content"
      });

    expect(res.status).toBe(401);
    expect(res.text).toBe("Access denied. No token provided");
  });

  // it("should return 400 for missing content field", async () => {
  //   // console.log("Users", users[0])
  //   const res = await request(app)
  //     .patch(`/api/posts/${posts[0]._id}`)
  //     .set("x-auth-token", users[2].token)
  //     .send({});

  //   expect(res.status).toBe(400);
  //   expect(res.text).toBe('"content" is required');
  // });

  // it("should return 400 for empty content field", async () => {
  //   const res = await request(app)
  //     .patch(`/api/posts/${posts[0]._id}`)
  //     .set("x-auth-token", users[3].token)
  //     .send({
  //       content: ""
  //     });

  //   expect(res.status).toBe(400);
  //   expect(res.text).toBe('"content" is not allowed to be empty');
  // });

  // it("should return 403 if the user is not the creator of the meal", async () => {
  //   const res = await request(app)
  //     .patch(`/api/posts/${posts[0]._id}`)
  //     .set("x-auth-token", users[2].token)
  //     .send({
  //       content: "Changing the meal"
  //     });

  //   expect(res.status).toBe(403);
  // });

  // it("should return 200 if the post was successfully updated", async () => {
  //   const res = await request(app)
  //     .patch(`/api/posts/${posts[0]._id}`)
  //     .set("x-auth-token", users[3].token)
  //     .send({
  //       content: "Changing the meal"
  //     });

  //   expect(res.status).toBe(200);
  // });
});
