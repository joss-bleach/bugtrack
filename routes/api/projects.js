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
