const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Project = require("../../models/Project");
const Bug = require("../../models/Bug");

// ROUTE - POST /api/bugs/projects/:projectid
// DESC - Create a new bug
// ACCESS - Private

// ROUTE - PUT /api/bugs/:id
// DESC - Update a bug
// ACCESS - Private

// ROUTE - DELETE /api/bugs/:id
// DESC - Delete a bug
// ACCESS - Private

// ROUTE - GET /api/bugs/:id
// DESC - Get a single bug
// ACCESS - Private

// ROUTE - GET /api/bugs/projects/:projectid
// DESC - Get all bugs from a project
// ACCESS - Private

// ROUTE - PUT /api/bugs/completed/:id
// DESC - Mark bug as completed
// ACCESS - Private

module.exports = router;
