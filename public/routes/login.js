"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const usersAdmin = { username: "sahar", password: "sahar1" };
// Add more username-password pairs as needed]
router.post("/", (req, res) => {
    const { username, password } = req.body;
    const users = {
        username,
        password,
    };
    if (users.username === usersAdmin.username &&
        users.password === usersAdmin.password) {
        res.status(200).json({ message: "Authentication successful" });
        // Allow access to the dashboard or perform other actions
    }
    else {
        res.status(401).json({ message: "Invalid username or password" });
        // Deny access or handle authentication failure
    }
});
module.exports = router;
