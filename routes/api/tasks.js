const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Project = require("../../models/Project");
const Task = require("../../models/Task");

// ROUTE - POST /api/tasks/:projectid
// DESC - Add a new task to a project
// ACCESS - Private
router.post(
  "/:projectid",
  [
    auth,
    [
      check("title", "Please enter a title.").not().isEmpty(),
      check("summary", "Please enter a task summary.").not().isEmpty(),
      check("priority", "Please enter the priority.").not().isEmpty(),
      check("status", "Please enter the status.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Check for Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check that the logged in user created the project that the task is being assigned to.
      const project = await Project.findById(req.params.projectid);
      if (project.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Unauthorised" });
      }

      // Initialise new task
      const { title, summary, priority, status, dueDate } = req.body;

      // Set fields
      const newTask = {};
      if (dueDate) newTask.dueDate = dueDate;
      newTask.title = title;
      newTask.summary = summary;
      newTask.priority = priority;
      newTask.status = status;
      newTask.user = req.user.id;
      newTask.project = req.params.projectid;

      // Save task
      const task = new Task(newTask);
      await task.save();
      return res.json(task);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "No project found." });
      }
      res.status(500).send("Server Error");
    }
  }
);

// ROUTE - DELETE /api/tasks/:id
// DESC - Delete a task
// ACCESS - PRIVATE
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    // Check if project exists
    if (!task) {
      return res.status(404).json({ msg: "No task found." });
    }

    // Check that project was created by user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised." });
    }

    await task.remove();
    res.json({ msg: "Task removed successfully." });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No project found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - PUT /api/tasks/completed/:id
// DESC - Mark task as complete
// ACCESS - Private
// ROUTE - PUT /api/projects/completed/:id
// DESC - Mark project as completed
// ACCESS - Private
router.put("/completed/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    // Check if project exists
    if (!task) {
      return res.status(404).json({ msg: "No task found." });
    }

    // Check that project was created by user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised." });
    }

    task.completed = true;
    await task.save();
    res.json({ msg: "Task completed." });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No task found." });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
