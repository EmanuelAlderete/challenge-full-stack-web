import { Router } from "express";
import { loggerMiddleware } from "../middlewares";

const router = Router();

router.use(loggerMiddleware);

// Ping server
router.get("/api/ping", (_req, res) => {
  res.status(200).json({
    message: "Pong!",
  });
});

// Custom 404 Error
router.use("/", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

export { router };
