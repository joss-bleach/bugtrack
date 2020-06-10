const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Project = require("../../models/Project");
const User = require("../../models/User");

// ROUTE - POST /api/projects
// DESC - Create a project
// ACCESS - Private
router.post(
  "/",
  [
    auth,
    [check("title", "Please enter the name of the project").not().isEmpty()],
  ],
  async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, summary, dueDate } = req.body;
      const newProject = {};
      newProject.user = req.user.id;
      newProject.title = title;
      if (summary) newProject.summary = summary;
      if (dueDate) newProject.dueDate = dueDate;

      const project = new Project(newProject);
      await project.save();
      res.json(project);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// ROUTE - GET /api/projects/user/:user_id
// DESC - Get all projects by user
// ACCESS - Private
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

// ROUTE - GET /api/projects/:id
// DESC - Get single project
// ACCESS - Private
router.get("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "No project found." });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No project found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - DELETE /api/projects/:id
// DESC - Delete a project (including all associated tasks and bugs)
// ACCESS - Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    // Check if project exists
    if (!project) {
      return res.status(404).json({ msg: "No project found." });
    }

    // Check that project was created by user
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised." });
    }

    await project.remove();
    res.json({ msg: "Project removed successfully." });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No project found." });
    }
    res.status(500).send("Server Error");
  }
});
