const request = require("supertest");
const app = require("../app");
const fs = require("fs/promises");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data", "transactions.json");

beforeEach(async () => {
  await fs.writeFile(DATA_FILE, "[]");
});

describe("Transaction API Tests", () => {

  it("should create a new transaction", async () => {
    const res = await request(app)
      .post("/transactions")
      .send({
        type: "income",
        amount: 5000,
        category: "salary"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.type).toBe("income");
    expect(res.body.amount).toBe(5000);
  });

  it("should return all transactions", async () => {

    await request(app).post("/transactions").send({
      type: "income",
      amount: 5000
    });

    const res = await request(app).get("/transactions");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("should get a single transaction", async () => {
    const create = await request(app).post("/transactions").send({
      type: "expense",
      amount: 300,
      category: "food"
    });

    const id = create.body.id;

    const res = await request(app).get(`/transactions/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(id);
  });

  it("should update a transaction", async () => {
    const create = await request(app).post("/transactions").send({
      type: "expense",
      amount: 100
    });

    const id = create.body.id;

    const res = await request(app)
      .patch(`/transactions/${id}`)
      .send({ amount: 200 });

    expect(res.statusCode).toBe(200);
    expect(res.body.amount).toBe(200);
  });

  it("should delete a transaction", async () => {
    const create = await request(app).post("/transactions").send({
      type: "expense",
      amount: 400
    });

    const id = create.body.id;

    const res = await request(app).delete(`/transactions/${id}`);

    expect(res.statusCode).toBe(204);
  });

});
