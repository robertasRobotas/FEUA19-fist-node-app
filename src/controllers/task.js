import { v4 as uuidv4 } from "uuid";
import TaskModel from "../models/task.js";

const INSERT_TASK = async (req, res) => {
  try {
    const task = new TaskModel({
      id: uuidv4(),
      userId: req.body.userId,
      title: req.body.title,
      isCompleted: false,
      createdAt: new Date(),
    });

    const response = await task.save();

    return res.status(201).json({
      task: response,
    });
  } catch (err) {
    console.log("We have some problems");
    console.log(err);

    return res.status(400).json({
      message: "we have some problems",
    });
  }
};

const GET_TASKS = async (req, res) => {
  try {
    const response = await TaskModel.find({ userId: req.body.userId });

    return res.status(200).json({
      tasks: response,
    });
  } catch (err) {
    console.log("We have some problems");
    console.log(err);

    return res.status(400).json({
      message: "we have some problems",
    });
  }
};

const GET_TASK_BY_ID = async (req, res) => {
  try {
    const task = await TaskModel.findOne({ id: req.params.id });

    if (!task) {
      return res.status(404).json({
        message: "This task does not exist",
      });
    }

    if (task.userId !== req.body.userId) {
      return res.status(403).json({
        message: "This task does not belong to you",
      });
    }

    const response = await TaskModel.findOne({ id: req.params.id });

    if (!response) {
      return res.status(404).json({
        message: `Data with id: ${req.params.id} not exist`,
      });
    }

    return res.status(200).json({
      task: response,
    });
  } catch (err) {
    console.log("We have some problems");
    console.log(err);

    return res.status(400).json({
      message: "we have some problems",
    });
  }
};

const REMOVE_TASK_BY_ID = async (req, res) => {
  try {
    const task = await TaskModel.findOne({ id: req.params.id });

    if (!task) {
      return res.status(404).json({
        message: "This task does not exist",
      });
    }

    if (task.userId !== req.body.userId) {
      return res.status(403).json({
        message: "This task does not belong to you",
      });
    }

    const response = await TaskModel.deleteOne({ id: req.params.id });

    return res.status(200).json({
      message: `Data with id: ${req.params.id} was removed`,
      response: response,
    });
  } catch (err) {
    console.log("We have some problems");
    console.log(err);

    return res.status(400).json({
      message: "we have some problems",
    });
  }
};

const UPDATE_TASK_BY_ID = async (req, res) => {
  try {
    const task = await TaskModel.findOne({ id: req.params.id });

    if (!task) {
      return res.status(404).json({
        message: "This task does not exist",
      });
    }

    if (task.userId !== req.body.userId) {
      return res.status(403).json({
        message: "This task does not belong to you",
      });
    }

    const response = await TaskModel.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body },
      { new: true }
    );

    return res.status(200).json({
      task: response,
      message: "updated successfully",
    });
  } catch (err) {
    console.log("We have some problems");
    console.log(err);

    return res.status(400).json({
      message: "we have some problems",
    });
  }
};

export {
  INSERT_TASK,
  GET_TASKS,
  GET_TASK_BY_ID,
  REMOVE_TASK_BY_ID,
  UPDATE_TASK_BY_ID,
};
