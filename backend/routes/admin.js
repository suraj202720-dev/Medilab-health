const express = require("express");
const router = express.Router();

// Hardcoded admin (internship demo ke liye OK)
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        return res.json({
            success: true,
            message: "Login successful"
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid credentials"
    });
});

module.exports = router;
