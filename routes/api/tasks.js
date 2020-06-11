const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Project = require("../../models/Project");
const Task = require("../../models/Task");

// ROUTE - POST /api/tasks/projects/:projectid
// DESC - Create a new task
// ACCESS - Private
router.post(
  "/projects/:projectid",
  [
    auth,
    [
      check("title", "Please enter a task title.").not().isEmpty(),
      check("summary", "Please enter a task summary.").not().isEmpty(),
      check("priority", "Please enter a task priority.").not().isEmpty(),
      check("status", "Please enter a task status.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check exists and that the logged in user created the project that the task is being assigned to
      const project = await Project.findById(req.params.projectid);
      if (!project) {
        return res.status(404).json({ msg: "Project Not Found." });
      }
      if (project.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Unauthorised Request." });
      }

      // Prepare user input for database
      const { title, summary, priority, status, dueDate } = req.body;
      const newTask = {};
      newTask.user = req.user.id;
      newTask.project = req.params.projectid;
      newTask.title = title;
      newTask.summary = summary;
      newTask.priority = priority;
      newTask.status = status;
      if (dueDate) newTask.dueDate = dueDate;

      // Save Task
      const task = new Task(newTask);
      await task.save();
      return res.json(task);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjecId") {
        return res.status(404).json({ msg: "No Project Found." });
      }
      res.status(500).send("Server Error");
    }
  }
);

// ROUTE - PUT /api/tasks/:id
// DESC - Update a project
// ACCESS - Private
router.put("/:id", auth, async (req, res) => {
  try {
    // Check that the task exists and that the logged in user created it
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task Not Found." });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised Request." });
    }

    // Prepare user input for update
    const { title, summary, priority, status, dueDate } = req.body;
    const updateTask = {};
    if (title) updateTask.title = title;
    if (summary) updateTask.summary = summary;
    if (priority) updateTask.priority = priority;
    if (status) updateTask.status = status;
    if (dueDate) updateTask.dueDate = dueDate;

    // Update task
    task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateTask },
      { new: true }
    );

    // Save task
    await task.save();
    return res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task Not Found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - DELETE /api/tasks/:id
// DESC - Delete a project
// ACCESS - Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check that the task exists and that the logged in user created it
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task Not Found." });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised Request." });
    }

    // Remove task
    await task.remove();
    res.json({ msg: "Task removed successfully." });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task Not Found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - GET /api/tasks/:id
// DESC - Get a single project
// ACCESS - Private
router.get("/:id", auth, async (req, res) => {
  try {
    // Check task exists
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task Not Found." });
    }

    // Return task
    res.json(task);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task Not Found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - GET /api/tasks/projects/:projectid
// DESC - Get all tasks from a project
// ACCESS - Private
router.get("/projects/:projectid", auth, async (req, res) => {
  try {
    // Check project exists
    let project = await Project.findById(req.params.projectid);
    if (!project) {
      return res.status(404).json({ msg: "Project Not Found." });
    }

    // Return all tasks assigned to project
    const tasks = await Task.find({ project: req.params.projectid }).sort({
      date: -1,
    });
    if (!tasks) {
      return res.status(404).json({ msg: "No Task Found." });
    }
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No Task Found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - PUT /api/tasks/completed/:id
// DESC - Mark task as completed
// ACCESS - Private
router.put("/completed/:id", auth, async (req, res) => {
  try {
    // Check for task and make sure logged in user created task.
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task Not Found." });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised Request." });
    }

    // Mark task as completed and save
    task.completed = true;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task Not Found." });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
