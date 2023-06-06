"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express.Router();
const usersAdmin = { username: "sahar", password: "sahar1" };
const secretKey = "PGS1401730";
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username and password are required" });
    }
    const users = {
        username,
        password,
    };
    if (users.username === usersAdmin.username &&
        users.password === usersAdmin.password) {
        const token = jsonwebtoken_1.default.sign(users, secretKey);
        res.status(200).json({ token });
        console.log("Generated JWT:", token);
        // Allow access to the dashboard or perform other actions
    }
    else {
        res.status(401).json({ message: "Invalid credentials" }); // Deny access or handle authentication failure
    }
    res.redirect('/protected');
});
// Protected route
router.post("/protected", verifyToken, (req, res) => {
    // This route is protected and can only be accessed with a valid token
    // res.send("xaya");
    res.json({ message: "Protected route accessed successfully" });
});
// Token verification middleware
function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        console.log(decoded);
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        next();
    });
}
module.exports = router;
