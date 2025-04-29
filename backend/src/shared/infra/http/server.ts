import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/router";
import { CorrelationIdMiddleware } from "./middlewares/correlationId.middleware";
import { HttpLoggerMiddleware } from "./middlewares/httpLogger.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";

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

app.use(CorrelationIdMiddleware);
app.use(HttpLoggerMiddleware);

// JSON middleware to parse requests
app.use(express.json());

// Import routes
app.use("/", routes);

app.use(errorHandler);

const startServer = (port: number = 3000) => {
  const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
  return server;
};

export { app, startServer };
