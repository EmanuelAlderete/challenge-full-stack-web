import { Router } from "express";

const routes = Router();

// Ping server
routes.get("/api/ping", (_req, res) => {
  res.status(200).json({
    message: "Pong!",
  });
});

// Custom 404 Error
routes.use("/", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

export { routes };
