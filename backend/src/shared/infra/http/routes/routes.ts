import { Router } from "express";

const routes = Router();

routes.get("/", (_req, res) => {
  res.status(200).json({
    message: "It's working",
  });
});

export { routes };
