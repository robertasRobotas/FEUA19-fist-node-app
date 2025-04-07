import { v4 as uuidv4 } from "uuid";

let tasks = [
  {
    id: "1",
    title: "walk with dog",
    isCompleted: false,
    createdAt: "2025-04-02T15:58:30.478Z",
  },
  {
    id: "2",
    title: "Learn node.js",
    isCompleted: false,
    createdAt: "2025-04-02T15:58:56.033Z",
  },
  {
    id: "3",
    title: "Make a dinner",
    isCompleted: false,
    createdAt: "2025-04-02T16:00:04.102Z",
  },
  {
    id: "4",
    title: "Get some sleep",
    isCompleted: false,
    createdAt: "2025-04-02T15:59:33.969Z",
  },
];

const INSERT_TASK = (req, res) => {
  const title = req.body.title;

  const isTaskExists = tasks.some((t) => t.title === title);

  if (isTaskExists) {
    return res.status(409).json({
      message: "this title already exists",
    });
  }

  const task = {
    id: uuidv4(),
    title: req.body.title,
    isCompleted: false,
    createdAt: new Date(),
  };

  tasks.push(task);

  return res.status(201).json({
    task: task,
  });
};

const GET_TASKS = (req, res) => {
  if (!tasks.length) {
    return res.status(404).json({
      message: "There are no tasks",
    });
  }

  return res.status(200).json({
    tasks: tasks,
  });
};

const GET_TASK_BY_ID = (req, res) => {
  const id = req.params.id;

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res
      .status(404)
      .json({ message: `Task with id ${id} does not exist` });
  }

  return res.status(200).json({
    task: task,
    message: "dddd",
  });
};

const REMOVE_ALL_TASKS = (req, res) => {
  tasks = [];
  return res.status(200).json({
    message: "All tasks was deleted",
  });
};

export { INSERT_TASK, GET_TASKS, GET_TASK_BY_ID, REMOVE_ALL_TASKS };
