"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const insertdata_1 = __importDefault(require("../DB/insertdata"));
const updatecontract_1 = __importDefault(require("../DB/updatecontract"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const contracts_1 = __importDefault(require("../DB/schema/contracts"));
const reports_1 = __importDefault(require("../DB/schema/reports"));
const reportsPayment_1 = __importDefault(require("../DB/schema/reportsPayment"));
const reportsReturnPayment_1 = __importDefault(require("../DB/schema/reportsReturnPayment"));
const router = express.Router();
const usersAdmin = { username: "sahar", password: "z" };
const secretKey = "PGS1401730";
router.post("/login", (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    const users = {
        username,
        password,
    };
    if (users.username === usersAdmin.username && users.password === usersAdmin.password) {
        const token = jsonwebtoken_1.default.sign(users, secretKey);
        res.json({ token });
        res.status(200).json({ message: "valid credentials" });
    }
    else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});
router.post("/dashboard", verifyToken, (req, res) => {
    console.log("token has valid");
    res.json({ message: "Protected route accessed successfully" });
});
router.post("/AddReports", verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.body !== "object" || req.body === null) {
        return res.status(400).json({ error: "Invalid payload" });
    }
    const { dateContract, numContract, customer, reports, typeContract } = req.body;
    const contract = yield insertdata_1.default.insertData({
        dateContract,
        numContract,
        customer,
        reports,
        typeContract,
    });
    if (!contract)
        return false;
    res.json({ id: contract.id });
}));
// router.post("/showReports", verifyToken, async (req, res) => {
//   const { id } = req.body;
//   const Contracts = await ContractsModel.findAll({
//     where: { id: parseInt(id) },
//     include: [
//       {
//         model: ReportsModel,
//         required: true, // Use inner join
//         include: [
//           {
//             model: ReportsPaymentModel,
//             // required: true,
//           },
//           {
//             model: ReportsReturnPaymentModel,
//             // required: true,
//           },
//         ],
//       },
//     ],
//   });
//   res.json({ Contracts });
// });
router.post("/showReports", verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    // Find the contract with the given ID
    const contract = yield contracts_1.default.findOne({
        where: { id: parseInt(id) },
        include: [
            {
                model: reports_1.default,
                required: true,
                include: [
                    {
                        model: reportsPayment_1.default,
                    },
                    {
                        model: reportsReturnPayment_1.default,
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
}));
router.post("/listOfReports", verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { page, limitPerPage } = req.body;
    const Contracts = yield contracts_1.default.findAll({
        // limit: limitPerPage,
        // offset: (page - 1) * limitPerPage,
        include: [
            {
                model: reports_1.default,
                required: true,
                include: [
                    {
                        model: reportsPayment_1.default,
                    },
                    {
                        model: reportsReturnPayment_1.default,
                    },
                ],
            },
        ],
    });
    res.json({ Contracts });
}));
router.post("/deleteReports", verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    yield contracts_1.default.destroy({
        where: { id: parseInt(id) },
    });
    res.json({ message: "Protected route accessed successfully" });
}));
router.post("/updateReports", verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, numContract, dateContract, typeContract, reports, customer } = req.body;
    console.log(req.body);
    yield updatecontract_1.default.updateData({
        id,
        numContract,
        dateContract,
        typeContract,
        reports,
        customer,
    });
    const findContract = yield contracts_1.default.findOne({
        where: { id: id },
        include: [
            {
                model: reports_1.default,
                required: true,
                include: [
                    {
                        model: reportsPayment_1.default,
                        required: true,
                    },
                    {
                        model: reportsReturnPayment_1.default,
                        required: true,
                    },
                ],
            },
        ],
    });
    res.json({ findContract });
}));
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
