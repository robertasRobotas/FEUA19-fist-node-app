import express from "express";
import {
  INSERT_TASK,
  GET_TASKS,
  GET_TASK_BY_ID,
  REMOVE_ALL_TASKS,
} from "../controllers/task.js";

const router = express.Router();

router.post("/insertTask", INSERT_TASK);

router.get("/getTasks", GET_TASKS);

router.get("/getTaskById/:id", GET_TASK_BY_ID);

router.delete("/removeAllTasks", REMOVE_ALL_TASKS);

export default router;
