const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // keep this (same lib used in register)
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// ✅ REGISTER
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      role
    });

    await user.save();

    res.json({ message: "User registered" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error registering user" });
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // 🔥 FIXED COMPARISON
    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret123", // fallback if env missing
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      role: user.role
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;