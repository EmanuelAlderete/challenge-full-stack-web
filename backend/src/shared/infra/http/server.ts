import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import { routes } from "./routes/routes";

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
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
