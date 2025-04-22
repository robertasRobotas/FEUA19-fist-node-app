import express from "express";
import {
  INSERT_TASK,
  GET_TASKS,
  GET_TASK_BY_ID,
  REMOVE_TASK_BY_ID,
  UPDATE_TASK_BY_ID,
} from "../controllers/task.js";
import validate from "../middleware/validation.js";
import createTaskSchema from "../schemas/task.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/tasks", validate(createTaskSchema), auth, INSERT_TASK);

router.get("/tasks", auth, GET_TASKS);

router.get("/tasks/:id", auth, GET_TASK_BY_ID);

router.put("/tasks/:id", auth, UPDATE_TASK_BY_ID);

router.delete("/tasks/:id", auth, REMOVE_TASK_BY_ID);

export default router;
