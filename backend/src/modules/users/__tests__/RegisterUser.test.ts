import app from "../../../../src/shared/infra/http/server";
import request from "supertest";
import { PrismaClient } from "../../../../prisma/generated/prisma-client-js";

const prisma = new PrismaClient();

describe("POST /api/users/register", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it("should register a user successfully", async () => {
    const payload = {
      name: "John Doe",
      email: "john@doe.com",
      password: "supersecurepassword123",
    };

    const response = await request(app)
      .post("/api/users/register")
      .send(payload)
      .expect(201);

    expect(response.headers.location).toBeDefined();
    expect(response.headers.location).toMatch(/^\/users\/\d+$/);

    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "John Doe");
    expect(response.body).toHaveProperty("email", "john@doe.com");
    expect(typeof response.body.id).toBe("number");
  });
});
