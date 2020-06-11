const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Project = require("../../models/Project");
const Bug = require("../../models/Bug");

// ROUTE - POST /api/bugs/projects/:projectid
// DESC - Create a new bug
// ACCESS - Private
router.post(
  "/projects/:projectid",
  [
    auth,
    [
      check("subject", "Please enter a bug subject.").not().isEmpty(),
      check("description", "Please enter a bug description.").not().isEmpty(),
      check("url", "Please enter valid URL.").isURL(),
      check("priority", "Please enter a bug priority.").not().isEmpty(),
      check("status", "Please enter a bug status.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check project exists and that the logged in user created the project that the task is being assigned to
      const project = await Project.findById(req.params.projectid);
      if (!project) {
        return res.status(404).json({ msg: "Project Not Found." });
      }
      if (project.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Unauthorised Request." });
      }

      // Prepare user input for database
      const { subject, description, url, priority, status } = req.body;
      const newBug = {};
      newBug.user = req.user.id;
      newBug.project = req.params.projectid;
      newBug.subject = subject;
      newBug.description = description;
      newBug.url = url;
      newBug.priority = priority;
      newBug.status = status;

      // Save Bug
      const bug = new Bug(newBug);
      await bug.save();
      return res.json(bug);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjecId") {
        return res.status(404).json({ msg: "No Project Found." });
      }
      res.status(500).send("Server Error");
    }
  }
);

// ROUTE - PUT /api/bugs/:id
// DESC - Update a bug
// ACCESS - Private
router.put("/:id", auth, async (req, res) => {
  try {
    // Check that the bug exists and that the logged in user created it
    let bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ msg: "Bug Not Found." });
    }
    if (bug.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised Request." });
    }

    // Prepare user input for update
    const { subject, description, url, priority, status } = req.body;
    const updateBug = {};
    if (subject) updateBug.subject = subject;
    if (description) updateBug.description = description;
    if (url) updateBug.url = url;
    if (priority) updateBug.priority = priority;
    if (status) updateBug.status = status;

    // Update bug
    bug = await Bug.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateBug },
      { new: true }
    );

    // Save task
    await bug.save();
    return res.json(bug);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Bug Not Found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - DELETE /api/bugs/:id
// DESC - Delete a bug
// ACCESS - Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check that the bug exists and that the logged in user created it
    let bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ msg: "Bug Not Found." });
    }
    if (bug.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised Request." });
    }

    // Remove bug
    await bug.remove();
    res.json({ msg: "Bug removed successfully." });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Bug Not Found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - GET /api/bugs/:id
// DESC - Get a single bug
// ACCESS - Private
router.get("/:id", auth, async (req, res) => {
  try {
    // Check bug exists
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ msg: "Bug Not Found." });
    }

    // Return task
    res.json(bug);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Bug Not Found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - GET /api/bugs/projects/:projectid
// DESC - Get all bugs from a project
// ACCESS - Private
router.get("/projects/:projectid", auth, async (req, res) => {
  try {
    // Check project exists
    let project = await Project.findById(req.params.projectid);
    if (!project) {
      return res.status(404).json({ msg: "Project Not Found." });
    }

    // Return all tasks assigned to project
    const bugs = await Bug.find({ project: req.params.projectid }).sort({
      date: -1,
    });
    if (!bugs) {
      return res.status(404).json({ msg: "No Bug Found." });
    }
    res.json(bugs);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No Task Found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - PUT /api/bugs/completed/:id
// DESC - Mark bug as completed
// ACCESS - Private
router.put("/completed/:id", auth, async (req, res) => {
  try {
    // Check for bug and make sure logged in user created task.
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ msg: "Bug Not Found." });
    }
    if (bug.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised Request." });
    }

    // Mark task as completed and save
    bug.completed = true;
    await bug.save();
    res.json(bug);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Bug Not Found." });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
