const Task = require("../models/Task");



// CREATE TASK
const createTask = async (req, res) => {
  try {

    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET TASKS
const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      user: req.user._id,
    });

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// UPDATE TASK
const updateTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title = req.body.title || task.title;

    task.description =
      req.body.description || task.description;

    task.completed =
      req.body.completed ?? task.completed;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// DELETE TASK
const deleteTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// EXPORTS
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};