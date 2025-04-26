import { app, startServer } from "../../../../src/shared/infra/http/server";
import request from "supertest";
import { PrismaClient } from "../../../../prisma/generated/prisma-client-js";

const prisma = new PrismaClient();

let serverInstance: any;

describe("/students - Endpoints", () => {
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

  it("[POST: /students] should register a student successfully", async () => {
    const payload = {
      name: "Just Another Student",
      email: "justanother@student.com",
      ra: "infotads2020.02",
      cpf: "01968185299",
    };

    const response = await request(app)
      .post("/api/students")
      .send(payload)
      .expect(201);

    expect(response.headers.location).toBeDefined();
    expect(response.headers.location).toMatch(/^\/students\/\d+$/);

    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", payload.name);
    expect(response.body).toHaveProperty("email", payload.email);
    expect(response.body).toHaveProperty("ra", payload.ra);
    expect(response.body).toHaveProperty("cpf", payload.cpf);
  });
});
