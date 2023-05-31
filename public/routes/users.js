"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const insertdata_1 = __importDefault(require("../DB/insertdata"));
const router = express.Router();
router.get("/get", (req, res) => {
    console.log(req.query);
    res.send(`${req.query.firstname} ${req.query.lastname} `);
    console.log(res);
});
router.post("/", (req, res) => {
    const people = {
        firstname: req.body.name,
        lastname: req.body.lastname,
    };
    insertdata_1.default.insertData(people);
    res.send(`${people.firstname} ${people.lastname}`);
    console.log(res);
});
module.exports = router;
