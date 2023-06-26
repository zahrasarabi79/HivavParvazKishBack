"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express.Router();
const usersAdmin = { username: "sahar", password: "z" };
const secretKey = "PGS1401730";
router.post("/login", (req, res, next) => {
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
        res.json({ token });
        res.status(200).json({ message: "valid credentials" });
    }
    else {
        res.status(401).json({ message: "Invalid credentials" }); // Deny access or handle authentication failure
    }
});
//dashboard route
router.post("/dashboard", verifyToken, (req, res) => {
    console.log("token has valid");
    res.json({ message: "Protected route accessed successfully" });
});
router.post("/AddReports", verifyToken, (req, res) => {
    const payload = req.body;
    console.log(payload.report);
    if (typeof payload !== "object" || payload === null) {
        return res.status(400).json({ error: "Invalid payload" });
    }
    res.json({ message: "Protected route accessed successfully" });
});
// Token verification middleware
function verifyToken(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        throw new Error("Authorization token is required");
    }
    jsonwebtoken_1.default.verify(token, secretKey, function (err, decoded) {
        if (err) {
            throw new Error("Error : " + err);
        }
        console.log(decoded);
    });
    next();
}
module.exports = router;
