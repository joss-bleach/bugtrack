const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Project = require("../../models/Project");
const Test = require("../../models/Test");

// ROUTE - POST /api/tests/projects/:projectid
// DESC - Create a new test
// ACCESS - Private
router.post(
  "/projects/:projectid",
  [
    auth,
    [
      check("title", "Please enter a test case.").not().isEmpty(),
      check("description", "Please enter a test description.").not().isEmpty(),
      check("expected", "Please enter the expected outcome.").not().isEmpty(),
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
      const { title, description, expected, outcome } = req.body;
      const newTest = {};
      newTest.user = req.user.id;
      newTest.project = req.params.projectid;
      newTest.title = title;
      newTest.description = description;
      newTest.expected = expected;
      if (outcome) newTest.outcome = outcome;

      // Save Bug
      const test = new Test(newTest);
      await test.save();
      return res.json(test);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjecId") {
        return res.status(404).json({ msg: "No Project Found." });
      }
      res.status(500).send("Server Error");
    }
  }
);

// ROUTE - PUT /api/tests/:id
// DESC - Update a test
// ACCESS - Private
router.put("/:id", auth, async (req, res) => {
  try {
    // Check that the test exists and that the logged in user created it
    let test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ msg: "Test Not Found." });
    }
    if (test.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised Request." });
    }

    // Prepare user input for update
    const { title, description, expected, outcome } = req.body;
    const updateTest = {};
    if (title) updateTest.title = title;
    if (description) updateTest.description = description;
    if (expected) updateTest.expected = expected;
    if (outcome) updateTest.outcome = outcome;

    // Update test
    test = await Test.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateTest },
      { new: true }
    );

    // Save task
    await test.save();
    return res.json(test);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Test Not Found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - DELETE /api/tests/:id
// DESC - Delete a test
// ACCESS - Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check that the test exists and that the logged in user created it
    let test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ msg: "Test Not Found." });
    }
    if (test.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised Request." });
    }

    // Remove test
    await test.remove();
    res.json({ msg: "Test removed successfully." });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Test Not Found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - GET /api/tests/:id
// DESC - Get a single test
// ACCESS - Private
router.get("/:id", auth, async (req, res) => {
  try {
    // Check test exists
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ msg: "Test Not Found." });
    }

    // Return task
    res.json(test);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Test Not Found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - GET /api/tests/projects/:projectid
// DESC - Get all tests from a project
// ACCESS - Private
router.get("/projects/:projectid", auth, async (req, res) => {
  try {
    // Check project exists
    let project = await Project.findById(req.params.projectid);
    if (!project) {
      return res.status(404).json({ msg: "Project Not Found." });
    }

    // Return all tests assigned to project
    const tests = await Test.find({ project: req.params.projectid }).sort({
      date: -1,
    });
    if (!tests) {
      return res.status(404).json({ msg: "No Test Found." });
    }
    res.json(tests);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No Test Found." });
    }
    res.status(500).send("Server Error");
  }
});

// ROUTE - PUT /api/tests/completed/:id
// DESC - Mark test as completed
// ACCESS - Private
router.put("/completed/:id", auth, async (req, res) => {
  try {
    // Check for test and make sure logged in user created task.
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ msg: "Test Not Found." });
    }
    if (test.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorised Request." });
    }

    // Mark task as completed and save
    test.completed = true;
    await test.save();
    res.json(test);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Test Not Found." });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
