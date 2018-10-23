const request = require("supertest");

const { users, meals, mealOneId, mealThreeId } = require("../seed");
const { Meal } = require("../../models/mealModel");
const { User } = require("../../models/userModel");

let app;

beforeEach(async () => {
  app = require("../../app");
  await Meal.insertMany(meals);
});

afterEach(async () => {
  await Meal.remove({});
});

describe("Create a Meal", () => {
  it("should return 401 if user is not authenticated", async () => {
    const res = await request(app)
      .post("/api/meals")
      .send({
        name: "Fried Rice",
        category: "Rice",
        cost: 114,
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(401);
    expect(res.text).toBe("Access denied. No token provided");
  });

  it("should return 403 if user is authenticated but not a vendor", async () => {
    const res = await request(app)
      .post("/api/meals")
      .set("x-auth-token", users[0].token)
      .send({
        name: "Fried Rice",
        category: "Rice",
        cost: 114,
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(403);
    expect(res.body).toEqual({ error: "You don't have permission" });
  });

  it("should return 400 for missing name field", async () => {
    const res = await request(app)
      .post("/api/meals")
      .set("x-auth-token", users[1].token)
      .send({
        category: "Rice",
        cost: 114,
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"name" is required');
  });

  it("should return 400 for empty name field", async () => {
    const res = await request(app)
      .post("/api/meals")
      .set("x-auth-token", users[1].token)
      .send({
        name: "",
        category: "Rice",
        cost: 114,
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"name" is not allowed to be empty');
  });

  it("should return 400 for missing category field", async () => {
    const res = await request(app)
      .post("/api/meals")
      .set("x-auth-token", users[1].token)
      .send({
        name: "Beans",
        cost: 114,
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"category" is required');
  });

  it("should return 400 for empty category field", async () => {
    const res = await request(app)
      .post("/api/meals")
      .set("x-auth-token", users[1].token)
      .send({
        name: "Chiken",
        category: "",
        cost: 114,
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"category" is not allowed to be empty');
  });

  it("should return 400 for missing tag field", async () => {
    const res = await request(app)
      .post("/api/meals")
      .set("x-auth-token", users[1].token)
      .send({
        name: "Beans",
        cost: 114,
        category: "Rice"
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"tags" is required');
  });

  it("should return 400 for empty tag field", async () => {
    const res = await request(app)
      .post("/api/meals")
      .set("x-auth-token", users[1].token)
      .send({
        name: "Fried Rice",
        cost: 114,
        category: "Rice",
        tags: []
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"tags" must contain at least 1 items');
  });

  it("should return 400 for missing cost field", async () => {
    const res = await request(app)
      .post("/api/meals")
      .set("x-auth-token", users[1].token)
      .send({
        name: "Beans",
        category: "Rice",
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"cost" is required');
  });

  it("should return 400 for empty cost field", async () => {
    const res = await request(app)
      .post("/api/meals")
      .set("x-auth-token", users[1].token)
      .send({
        name: "Fried Rice",
        cost: "",
        category: "Rice",
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"cost" must be a number');
  });
});

describe("Get meals", () => {
  it("should return status code of 404 if no meal found", async () => {
    const res = await request(app).get("/api/meals/5bc259266d2022c8e1fd4e39");

    expect(res.status).toBe(404);
  });

  it("should get one meal", async () => {
    const res = await request(app).get(`/api/meals/${mealOneId}`);

    expect(res.status).toBe(200);
  });

  it("should get all the meals", async () => {
    const res = await request(app).get("/api/meals");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe("Update a Meal", () => {
  it("should return 401 if user is not authenticated", async () => {
    const res = await request(app)
      .patch(`/api/meals/${mealOneId}`)
      .send({
        name: "Fried Rice",
        category: "Rice",
        cost: 34,
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(401);
    expect(res.text).toBe("Access denied. No token provided");
  });

  it("should return 403 if user is authenticated but not a vendor", async () => {
    const res = await request(app)
      .patch(`/api/meals/${mealOneId}`)
      .set("x-auth-token", users[0].token)
      .send({
        name: "Fried Rice",
        category: "Rice",
        cost: 34,
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(403);
    expect(res.body).toEqual({ error: "You don't have permission" });
  });

  it("should return 400 for missing name field", async () => {
    const res = await request(app)
      .patch(`/api/meals/${mealOneId}`)
      .set("x-auth-token", users[1].token)
      .send({
        category: "Rice",
        cost: 34,
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"name" is required');
  });

  it("should return 400 for empty name field", async () => {
    const res = await request(app)
      .patch(`/api/meals/${mealOneId}`)
      .set("x-auth-token", users[1].token)
      .send({
        name: "",
        category: "Rice",
        cost: 34,
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"name" is not allowed to be empty');
  });

  it("should return 400 for missing category field", async () => {
    const res = await request(app)
      .patch(`/api/meals/${mealOneId}`)
      .set("x-auth-token", users[1].token)
      .send({
        name: "Beans",
        cost: 34,
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"category" is required');
  });

  it("should return 400 for empty category field", async () => {
    const res = await request(app)
      .patch(`/api/meals/${mealOneId}`)
      .set("x-auth-token", users[1].token)
      .send({
        name: "Chiken",
        category: "",
        cost: 34,
        tags: ["salad", "eggs"]
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"category" is not allowed to be empty');
  });

  it("should return 400 for missing tag field", async () => {
    const res = await request(app)
      .patch(`/api/meals/${mealOneId}`)
      .set("x-auth-token", users[1].token)
      .send({
        name: "Beans",
        cost: 34,
        category: "Rice"
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"tags" is required');
  });

  it("should return 400 for empty tag field", async () => {
    const res = await request(app)
      .patch(`/api/meals/${mealOneId}`)
      .set("x-auth-token", users[1].token)
      .send({
        name: "Fried Rice",
        category: "Rice",
        cost: 34,
        tags: []
      });

    expect(res.status).toBe(400);
    expect(res.text).toBe('"tags" must contain at least 1 items');
  });

  it("should return 403 if the vendor is not the creator of the meal", async () => {
    const res = await request(app)
      .patch(`/api/meals/${mealOneId}`)
      .set("x-auth-token", users[2].token)
      .send({
        name: "Jollof Rice",
        category: "sause",
        cost: 34,
        tags: ["salad", "corn", "egg"]
      });

    expect(res.status).toBe(403);
  });

  it("should return 200 if the meal was successfully updated", async () => {
    const res = await request(app)
      .patch(`/api/meals/${mealOneId}`)
      .set("x-auth-token", users[1].token)
      .send({
        name: "Jollof Rice",
        category: "sause",
        cost: 12,
        tags: ["salad", "corn", "egg"]
      });

    expect(res.status).toBe(200);
  });
});

describe("Delete Meal", () => {
  it("should return 400 if the meal id is not valid", async () => {
    const res = await request(app)
      .delete(`/api/meals/123456`)
      .set("x-auth-token", users[1].token);

    expect(res.status).toBe(400);
  });

  it("should return 404 if the meal is not found", async () => {
    const res = await request(app)
      .delete(`/api/meals/${mealThreeId}`)
      .set("x-auth-token", users[1].token);

    expect(res.status).toBe(404);
  });

  it("should return 403 if the vendor is not the creator of the meal", async () => {
    const res = await request(app)
      .delete(`/api/meals/${mealOneId}`)
      .set("x-auth-token", users[2].token);

    expect(res.status).toBe(403);
  });

  it("should return 200 if the the meal was successfully deleted", async () => {
    const res = await request(app)
      .delete(`/api/meals/${mealOneId}`)
      .set("x-auth-token", users[1].token);

    expect(res.status).toBe(200);
  });
});
