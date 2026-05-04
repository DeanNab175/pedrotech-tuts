import express from "express";
import { config } from "dotenv";

import { connectDB, disconnectDB } from "./config/db.js";

// Import Routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";

config();
connectDB();

const app = express();
const PORT = 5001;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g. database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection: ", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception: ", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", (err) => {
  console.log("SIGTERM received shutting down gracefully: ");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

/* 
RUN a docker PostgreSql db:
docker run --name my-postgresql-db -e POSTGRES_PASSWORD=mysecrectpassword -p 5432:5432 -d postgres
*/
