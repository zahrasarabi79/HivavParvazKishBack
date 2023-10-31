import express = require("express");
import { Request, Response } from "express";
import insertData from "../DB/insertdata";
import updatecontract from "../DB/updatecontract";
import jwt from "jsonwebtoken";
import { IContractDto, IUpdateContractDto } from "../dto/IContractDto";
import ContractsModel from "../DB/schema/contracts";
import ReportsModel from "../DB/schema/reports";
import ReportsPaymentModel from "../DB/schema/reportsPayment";
import ReportsReturnPaymentModel from "../DB/schema/reportsReturnPayment";
import updatepassword from "../DB/updatepassword";
import UserModel from "../DB/schema/users";
import { Events, raiseEvent } from "../DB/raise-event";
import { updatedEventStory } from "../DB/eventStory";
import Event from "../DB/schema/event";
import { Op } from "sequelize";
import { userInfo } from "os";

const router = express.Router();
const secretKey = "PGS1401730";

interface IUsers {
  username: string;
  password: string;
}

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    // Use Sequelize to find a user with the provided username
    const user = await UserModel.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.password === password) {
      // User's credentials are valid; generate a JWT token
      const token = jwt.sign({ username, id: user.id }, secretKey);
      res.status(200).json({ token, message: "Valid credentials" });
    } else {
      // Password does not match
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/dashboard", verifyToken, (req, res) => {
  console.log("token has valid");
  res.json({ message: "Protected route accessed successfully" });
});
// router.post("/profileinformation", verifyToken, (req, res) => {
//   const username = (req as any).user.username;

//   // You can now use the username in your route handler
//   res.json({ username });
// });
router.post("/profileinformation", verifyToken, async (req, res) => {
  const userId = (req as any).user.id;
  try {
    const user = await UserModel.findOne({
      where: { id: userId },
      attributes: ["name"], 
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/updatepassword", verifyToken, async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;

  try {
    await updatepassword((req as unknown as { user: UserModel }).user.username, newPassword, oldPassword);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post("/AddReports", verifyToken, async (req, res) => {
  if (typeof req.body !== "object" || req.body === null) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const { dateContract, numContract, customer, reports, typeContract } = req.body as IContractDto;
  const contract = await insertData.insertData({
    dateContract,
    numContract,
    customer,
    reports,
    typeContract,
  });

  if (!contract) return false;
  await raiseEvent((req as any).user.id, contract.id, Events.ContractCreated);
  res.json({ id: contract.id });
});

router.post("/showReports", verifyToken, async (req, res) => {
  const { id } = req.body;

  // Find the contract with the given ID
  const contract = await ContractsModel.findOne({
    where: { id: parseInt(id) },
    include: [
      {
        model: ReportsModel,
        required: true,
        include: [
          {
            model: ReportsPaymentModel,
          },
          {
            model: ReportsReturnPaymentModel,
          },
        ],
      },
    ],
  });

  // Return only the contract data with associated reports
  const result = {
    Contracts: [contract],
  };

  res.json(result);
});

router.post("/listOfReports", verifyToken, async (req, res) => {
  const { page, limitPerPage } = req.body;
  // Fetch the total count of objects in the database
  const totalCount = await ContractsModel.count();
  const Contracts = await ContractsModel.findAll({
    limit: limitPerPage,
    offset: (page - 1) * limitPerPage,
    include: [
      {
        model: ReportsModel,
        required: true,
        include: [
          {
            model: ReportsPaymentModel,
          },
          {
            model: ReportsReturnPaymentModel,
          },
        ],
      },
    ],
    order: [["id", "DESC"]],
  });

  res.json({ Contracts, totalCount });
});
router.post("/listOfSystemHistory", verifyToken, async (req, res) => {
  const { page, limitPerPage } = req.body;
  const totalCount = await Event.count();
  const Events = await Event.findAll({
    limit: limitPerPage,
    offset: (page - 1) * limitPerPage,
    order: [["id", "DESC"]],
  });
  const users = await UserModel.findAll({
    where: {
      id: { [Op.in]: [...new Set(Events.map((event) => event.userId))] as any[] },
    },
  });
  const contracts = await ContractsModel.findAll({
    where: {
      id: { [Op.in]: [...new Set(Events.map((event) => event.contractId))] as any[] },
    },
  });

  res.json({
    Events: Events.map((event: any) => {
      // console.log(users.find((u) => u.id === event.userId)?.username);

      const username = users.find((u) => u.id === event.userId)?.username;
      const numContract = contracts.find((c) => c.id === event.contractId)!.numContract;
      return {
        id: event.id,
        eventName: event.eventName,
        createdAt: event.createdAt,
        username,
        numContract,
      };
    }),
    totalCount,
  });
});

router.post("/deleteReports", verifyToken, async (req, res) => {
  const { id } = req.body;

  await ContractsModel.destroy({
    where: { id: parseInt(id) },
  });
  res.json({ message: "Protected route accessed successfully" });
});

router.post("/updateReports", verifyToken, async (req, res) => {
  const { id, numContract, dateContract, typeContract, reports, customer }: IUpdateContractDto = req.body;
  const existedContract = await ContractsModel.findOne({
    where: { id: id },
    include: [
      {
        model: ReportsModel,
        required: true, // Use inner join
        include: [
          {
            model: ReportsPaymentModel,
            required: false,
          },
          {
            model: ReportsReturnPaymentModel,
            required: false,
          },
        ],
      },
    ],
  });

  await updatecontract.updateData({
    id,
    numContract,
    dateContract,
    typeContract,
    reports,
    customer,
  });
  const FindContract = await ContractsModel.findOne({
    where: { id: id },
    include: [
      {
        model: ReportsModel,
        required: true, // Use inner join
        include: [
          {
            model: ReportsPaymentModel,
            required: true,
          },
          {
            model: ReportsReturnPaymentModel,
            required: true,
          },
        ],
      },
    ],
  });
  const updatedReports = { id, numContract, dateContract, typeContract, reports, customer };
  const UpdateEvents: string[] = updatedEventStory(updatedReports, existedContract);
  UpdateEvents.map(async (event: any) => await raiseEvent((req as any).user.id, id, event));
  res.json({ FindContract });
});

// Token verification middleware
function verifyToken(req: Request, res: Response, next: Function) {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log(token);

  if (!token?.length) {
    console.log("fgdfg");

    throw new Error("Authorization token is required");
  }
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      throw new Error("Error : " + err);
    }

    (req as any).user = decoded;
  });
  next();
}

module.exports = router;
