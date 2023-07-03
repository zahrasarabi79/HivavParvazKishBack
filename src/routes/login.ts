import express = require("express");
import { Request, Response } from "express";
import insertData from "../DB/insertdata";
import updatecontract from "../DB/updatecontract";
import jwt from "jsonwebtoken";
import { error } from "console";
import { IContractDto, IUpdateContractDto } from "../dto/IContractDto";
import { parseArgs } from "util";
import PassengersModel, { IPassengersModel } from "../DB/schema/passengers";
import Contracts from "../DB/schema/contracts";
import Report, { IReportsModel } from "../DB/schema/report";
import { where } from "sequelize";
import ContractsModel from "../DB/schema/contracts";
import ReportsModel from "../DB/schema/report";

const router = express.Router();
const usersAdmin = { username: "sahar", password: "z" };
const secretKey = "PGS1401730";

interface IUsers {
  username: string;
  password: string;
}

router.post("/login", (req: Request, res: Response, next: Function) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const users: IUsers = {
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
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.post("/dashboard", verifyToken, (req, res) => {
  console.log("token has valid");
  res.json({ message: "Protected route accessed successfully" });
});

router.post("/AddReports", verifyToken, async (req, res) => {
  if (typeof req.body !== "object" || req.body === null) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const { dateContract, numContract, passengers, report, typeReport } =
    req.body as IContractDto;
  // await insertData.insertData(payload);
  const contract = await insertData.insertData({
    dateContract,
    numContract,
    passengers,
    report,
    typeReport,
  });
  if (!contract) return false;

  res.json({ id: contract.id });
  // res.json({ message: "Protected route accessed successfully" });
});

router.post("/showReports", verifyToken, async (req, res) => {
  const { id } = req.body;
  const Contracts = await ContractsModel.findAll({
    where: { id: parseInt(id) },
    include: [
      {
        model: ReportsModel,
        required: true, // Use inner join
      },
      {
        model: PassengersModel,
        required: true, // Use inner join
      },
    ],
  });

  res.json({ Contracts });
});
router.post("/listOfReports", verifyToken, async (req, res) => {
  const { id } = req.body;
  const Contracts = await ContractsModel.findAll({
    where: { id: parseInt(id) },
    include: [
      {
        model: ReportsModel,
        required: true, // Use inner join
      },
      {
        model: PassengersModel,
        required: true, // Use inner join
      },
    ],
  });
  const { numContract, dateContract } = Contracts[0].dataValues;

  res.json({ numContract, dateContract });
});
router.post("/deleteReports", verifyToken, async (req, res) => {
  const { id } = req.body;
  await ContractsModel.destroy({
    where: { id: parseInt(id) },
  });
});
router.post("/updateReports", verifyToken, async (req, res) => {
  const {
    id,
    numContract,
    dateContract,
    typeReport,
    report,
    passengers,
  }: IUpdateContractDto = req.body;

  await updatecontract.updateData({
    id,
    numContract,
    dateContract,
    typeReport,
    report,
    passengers,
  });
  const findContract = await ContractsModel.findOne({
    where: { id: id },
    include: [
      {
        model: ReportsModel,
        required: true, // Use inner join
      },
      {
        model: PassengersModel,
        required: true, // Use inner join
      },
    ],
  });
  res.json({ findContract });
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
