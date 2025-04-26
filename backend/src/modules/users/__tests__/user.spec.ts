import { app, startServer } from "../../../../src/shared/infra/http/server";
import request from "supertest";
import { PrismaClient } from "../../../../prisma/generated/prisma-client-js";

const prisma = new PrismaClient();

let serverInstance: any;

describe("POST /api/users/register", () => {
  beforeAll(async () => {
    const testPort = process.env.TEST_PORT || 3001;
    serverInstance = startServer(Number(testPort));
    await new Promise((resolve) => setTimeout(resolve, 100));
  });

  afterAll(async () => {
    if (serverInstance) {
      await new Promise<void>((resolve, reject) => {
        serverInstance.close((err: any) => {
          if (err) {
            console.error("Error closing test server:", err);
            return reject(err);
          }
          console.log("Test server closed.");
          resolve();
        });
      });
    }

    await prisma.$disconnect();
  });

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
