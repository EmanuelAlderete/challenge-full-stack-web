import { Router } from "express";
import UserRoutes from "../../../../modules/users/routes/user.routes";
import StudentsRoutes from "../../../../modules/students/routes/students.routes";

const router = Router();
// Ping server
router.get("/api/ping", (_req, res) => {
  res.status(200).json({
    message: "Pong!",
  });
});

router.use("/api/users", UserRoutes);
router.use("/api/students", StudentsRoutes);

// Custom 404 Error
router.use("/", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});
export default router;
