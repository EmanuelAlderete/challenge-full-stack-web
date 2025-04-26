import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/router";

// Load .env variables
dotenv.config();

const app = express();

// Sets Helmet for improve security
app.use(helmet());

// Define allowed origins
app.use(
  cors({
    origin: process.env.CORS_CORS_ORIGIN || "*",
  })
);

// JSON middleware to parse requests
app.use(express.json());

// Import routes
app.use("/", routes);

const startServer = (port: number = 3000) => {
  const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
  return server;
};

export { app, startServer };
