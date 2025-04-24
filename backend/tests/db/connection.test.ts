import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

describe("Database Connection", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should connect to the PostgreSQL database", async () => {
    await expect(prisma.$queryRaw`SELECT 1`).resolves.not.toThrow();
  });
});
