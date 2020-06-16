const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

// ROUTE - POST /api/users
// DESC - Register a User
// ACCESS - Public
router.post(
  "/",
  [
    check("firstName", "Please enter your first name.").not().isEmpty(),
    check("lastName", "Please enter your last name").not().isEmpty(),
    check("email", "Please enter a valid email address.").isEmail(),
    check(
      "password",
      "Your password must contain at least 6 characters."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { firstName, lastName, email, password } = req.body;

      // Check to see if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists." }] });
      }

      // Create user instance
      user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user
      await user.save();

      // Prepate JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("secretOr"),
        { expiresIn: config.get("jwtExpiry") },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // Sign Token
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
