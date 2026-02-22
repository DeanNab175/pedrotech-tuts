import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient({
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
