import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.ts";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
    adapter,
    log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("DB connected via Prisma");
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
}

async function disconnectDB() {
  await prisma.$disconnect();
}

export { prisma, connectDB, disconnectDB };
