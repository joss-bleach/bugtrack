const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Project = require("../../models/Project");
const Test = require("../../models/Test");

// ROUTE - POST /api/tests/projects/:projectid
// DESC - Create a new test
// ACCESS - Private

// ROUTE - PUT /api/tests/:id
// DESC - Update a test
// ACCESS - Private

// ROUTE - DELETE /api/tests/:id
// DESC - Delete a test
// ACCESS - Private

// ROUTE - GET /api/tests/:id
// DESC - Get a single test
// ACCESS - Private

// ROUTE - GET /api/tests/projects/:projectid
// DESC - Get all tests from a project
// ACCESS - Private

// ROUTE - PUT /api/tests/completed/:id
// DESC - Mark test as completed
// ACCESS - Private

module.exports = router;
