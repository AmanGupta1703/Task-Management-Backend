import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Secure all task routes
router.use(verifyJWT);

router.route("/").get(getTasks).post(createTask);

router.route("/:id").patch(updateTask).delete(deleteTask);

export default router;
