import express = require("express");
import { Request, Response } from "express";
import insertData from "../DB/insertdata";
import jwt from "jsonwebtoken";
import { IUsers}  from "../app";
import { error } from "console";

const router = express.Router();
const usersAdmin = { username: "sahar", password: "z" };
const secretKey = "PGS1401730";

router.post("/login", (req: Request, res: Response, next: Function) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const users:IUsers = {
    username,
    password,
  };
  if (
    users.username === usersAdmin.username &&
    users.password === usersAdmin.password
  ) {
    const token = jwt.sign(users, secretKey);
    res.json({ token });
    res.status(200).json({ message: "valid credentials" });
  } else {
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
  console.log(payload.report)
  if (typeof payload !== "object" || payload === null) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  res.json({ message: "Protected route accessed successfully" });
});

// Token verification middleware
function verifyToken(req: Request, res: Response, next: Function) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new Error("Authorization token is required");
  }
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      throw new Error("Error : " + err);
    }
    console.log(decoded);
  });
  next();
}

module.exports = router;
