import { Router } from "express";
import LoggerMiddlewares from "../middlewares";
import UserRoutes from ".././../../../modules/users/routes/userRoutes";

const router = Router();

router.use(LoggerMiddlewares);

// Ping server
router.get("/api/ping", (_req, res) => {
  res.status(200).json({
    message: "Pong!",
  });
});

// Custom 404 Error
// router.use("/", (req, res) => {
//   res.status(404).json({ error: "API route not found" });
// });

router.use("/api/users", UserRoutes);

export default router;
