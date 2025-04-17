import express from "express";
import {
  INSERT_TASK,
  GET_TASKS,
  GET_TASK_BY_ID,
  REMOVE_ALL_TASKS,
  REMOVE_TASK_BY_ID,
  LOG_INFO,
  UPDATE_TASK_BY_ID,
} from "../controllers/task.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/tasks", auth, INSERT_TASK);

router.get("/tasks", auth, GET_TASKS);

router.get("/tasks/:id", GET_TASK_BY_ID);

router.put("/tasks/:id", UPDATE_TASK_BY_ID);

router.delete("/tasks", REMOVE_ALL_TASKS);

router.delete("/tasks/:id", REMOVE_TASK_BY_ID);

router.get("/log", LOG_INFO);

export default router;
