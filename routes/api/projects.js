const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Project = require("../../models/Project");

// ROUTE - POST /api/projects
// DESC - Create a new project
// ACCESS - Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Please enter a project title.").not().isEmpty(),
      check("summary", "Please enter a project summary").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Prepare user input for database
      const { title, summary, dueDate } = req.body;
      const newProject = {};
      newProject.user = req.user.id;
      newProject.title = title;
      newProject.summary = summary;
      if (dueDate) newProject.summary = dueDate;

      // Save to database and return project information
      const project = new Project(newProject);
      await project.save();
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// ROUTE - PUT /api/projects/:id
// DESC - Update a project
// ACCESS - Private
router.put("/:id", auth, async (req, res) => {
  try {
    // Check if project exists and that the logged in user created the project
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "No project found." });
    }
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised Request." });
    }

    // Prepare user input for update
    const { title, summary, dueDate } = req.body;
    const updateProject = {};
    if (title) updateProject.title = title;
    if (summary) updateProject.summary = summary;
    if (dueDate) updateProject.dueDate = dueDate;

    // Update project
    project = await Project.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateProject },
      { new: true }
    );

    // Save project
    await project.save();
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
// DESC - Delete a project
// ACCESS - Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check project exists
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "No project found." });
    }

    // Check that current user created project
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised Request." });
    }

    // Remove project
    await project.remove();
    res.json({ msg: "Project deleted successfully." });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No project found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - GET /api/projects/:id
// DESC - Get a single project
// ACCESS - Private
router.get("/:id", auth, async (req, res) => {
  try {
    // Check project exists
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "No project found." });
    }

    // Return project
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No project found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - GET /api/projects/users/:userid
// DESC - Get all projects from a single user
// ACCESS - Private
router.get("/users/:userid", auth, async (req, res) => {
  try {
    // Search for projects by user id
    const projects = await Project.find({ user: req.user.id }).sort({
      date: -1,
    });

    // Check projects exist
    if (!projects) {
      return res.status(404).json({ msg: "No projects found." });
    }

    // Return projects
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ROUTE - PUT /api/projects/completed/:id
// DESC - Mark project as complete
// ACCESS - Private
router.put("/completed/:id", auth, async (req, res) => {
  try {
    // Check for project
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "No project found." });
    }

    // Check that current user created project
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised Request." });
    }

    // Mark project as complete and save
    project.completed = true;
    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No project found." });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
