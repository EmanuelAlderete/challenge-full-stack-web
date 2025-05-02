import { app, startServer } from "../../../../src/shared/infra/http/server";
import request from "supertest";
import { PrismaClient } from "../../../../prisma/generated/prisma-client-js";
import { CreateStudentDto } from "../dtos/CreateStudentDto";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

let serverInstance: any;
let studentId: number;
let payload: Partial<CreateStudentDto>;
let payloadUpdated: Partial<CreateStudentDto>;
let token: string;

describe("/students - Endpoints", () => {
  beforeAll(async () => {
    const testPort = process.env.TEST_PORT || 3002;
    serverInstance = startServer(Number(testPort));
    await new Promise((resolve) => setTimeout(resolve, 100));
    await prisma.student.deleteMany();

    const userPayload = { id: 1, email: "testuser@example.com" }; // Payload fictício
    const JWT_SECRET = String(process.env.JWT_SECRET);
    token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "1h" });
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
    await prisma.student.deleteMany();
    await prisma.$disconnect();
  });

  it("[POST: /students] should register a student successfully", async () => {
    payload = {
      name: "Just Another Student",
      email: "justanother@student.com",
      ra: "infotads2020.02",
      cpf: "01968185299",
    };

    const response = await request(app)
      .post("/api/students")
      .set("Authorization", `Bearer ${token}`)
      .send(payload)
      .send(payload)
      .expect(201);

    studentId = response.body.data.id;

    expect(response.headers.location).toBeDefined();
    expect(response.headers.location).toMatch(/^\/students\/\d+$/);

    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("name", payload.name);
    expect(response.body.data).toHaveProperty("email", payload.email);
    expect(response.body.data).toHaveProperty("ra", payload.ra);
    expect(response.body.data).toHaveProperty("cpf", payload.cpf);
  });

  it("[GET: /students] should return a list of students", async () => {
    const response = await request(app)
      .get("/api/students")
      .set("Authorization", `Bearer ${token}`)
      .send(payload)
      .expect(200);

    expect(response.body.data).toBeDefined();
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("[PUT: /students/:id] should update a student", async () => {
    payloadUpdated = {
      name: "Student Updated",
      email: "email@updated.com",
    };
    const response = await request(app)
      .put(`/api/students/${studentId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(payloadUpdated)
      .expect(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty("name", payloadUpdated.name);
    expect(response.body.data).toHaveProperty("email", payloadUpdated.email);
  });

  it("[GET: /students/:id] should find an especific student", async () => {
    const response = await request(app)
      .get(`/api/students/${studentId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("name", payloadUpdated.name);
    expect(response.body.data).toHaveProperty("email", payloadUpdated.email);
  });
});
