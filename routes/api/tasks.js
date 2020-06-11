const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Project = require("../../models/Project");
const Task = require("../../models/Task");

// ROUTE - POST /api/tasks/projects/:projectid
// DESC - Create a new task
// ACCESS - Private

// ROUTE - PUT /api/tasks/:id
// DESC - Update a project
// ACCESS - Private

// ROUTE - DELETE /api/tasks/:id
// DESC - Delete a project
// ACCESS - Private

// ROUTE - GET /api/tasks/:id
// DESC - Get a single project
// ACCESS - Private

// ROUTE - GET /api/tasks/projects/:projectid
// DESC - Get all tasks from a project
// ACCESS - Private

// ROUTE - PUT /api/tasks/completed/:id
// DESC - Mark task as completed
// ACCESS - Private

module.exports = router;
