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
const updatepassword_1 = __importDefault(require("../DB/updatepassword"));
const users_1 = __importDefault(require("../DB/schema/users"));
const raise_event_1 = require("../DB/raise-event");
const eventStory_1 = require("../DB/eventStory");
const event_1 = __importDefault(require("../DB/schema/event"));
const sequelize_1 = require("sequelize");
const insertUser_1 = __importDefault(require("../DB/insertUser"));
const router = express.Router();
const secretKey = "PGS1401730";
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        // Use Sequelize to find a user with the provided username
        const user = yield users_1.default.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        if (user.password === password) {
            // User's credentials are valid; generate a JWT token
            const token = jsonwebtoken_1.default.sign({ username, id: user.id }, secretKey);
            res.status(200).json({ token, message: "Valid credentials" });
        }
        else {
            // Password does not match
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.post("/dashboard", verifyToken, (req, res) => {
    console.log("token has valid");
    res.json({ message: "Protected route accessed successfully" });
});
// router.post("/profileinformation", verifyToken, (req, res) => {
//   const username = (req as any).user.username;
//   // You can now use the username in your route handler
//   res.json({ username });
// });
router.post("/profileinformation", verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    try {
        const user = yield users_1.default.findOne({
            where: { id: userId },
            attributes: ["name"],
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ name: user.name });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}));
router.post("/updatepassword", verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, oldPassword, newPassword } = req.body;
    try {
        yield (0, updatepassword_1.default)(req.user.username, newPassword, oldPassword);
        res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
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
    yield (0, raise_event_1.raiseEvent)(req.user.id, contract.id, raise_event_1.Events.ContractCreated);
    res.json({ id: contract.id });
}));
router.post("/AddUsers", verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.body !== "object" || req.body === null) {
        return res.status(400).json({ error: "Invalid User" });
    }
    const { name, username, password, role } = req.body;
    const user = yield insertUser_1.default.insertUser({
        name,
        username,
        password,
        role,
    });
    if (!user)
        return false;
    res.json({ user });
}));
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
    const { page, limitPerPage } = req.body;
    // Fetch the total count of objects in the database
    const totalCount = yield contracts_1.default.count();
    const Contracts = yield contracts_1.default.findAll({
        limit: limitPerPage,
        offset: (page - 1) * limitPerPage,
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
        order: [["id", "DESC"]],
    });
    res.json({ Contracts, totalCount });
}));
router.post("/listOfSystemHistory", verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limitPerPage } = req.body;
    const totalCount = yield event_1.default.count();
    const Events = yield event_1.default.findAll({
        limit: limitPerPage,
        offset: (page - 1) * limitPerPage,
        order: [["id", "DESC"]],
    });
    const users = yield users_1.default.findAll({
        where: {
            id: { [sequelize_1.Op.in]: [...new Set(Events.map((event) => event.userId))] },
        },
    });
    const contracts = yield contracts_1.default.findAll({
        where: {
            id: { [sequelize_1.Op.in]: [...new Set(Events.map((event) => event.contractId))] },
        },
    });
    res.json({
        Events: Events.map((event) => {
            // console.log(users.find((u) => u.id === event.userId)?.username);
            var _a;
            const username = (_a = users.find((u) => u.id === event.userId)) === null || _a === void 0 ? void 0 : _a.name;
            const numContract = contracts.find((c) => c.id === event.contractId).numContract;
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
    const existedContract = yield contracts_1.default.findOne({
        where: { id: id },
        include: [
            {
                model: reports_1.default,
                required: true,
                include: [
                    {
                        model: reportsPayment_1.default,
                        required: false,
                    },
                    {
                        model: reportsReturnPayment_1.default,
                        required: false,
                    },
                ],
            },
        ],
    });
    yield updatecontract_1.default.updateData({
        id,
        numContract,
        dateContract,
        typeContract,
        reports,
        customer,
    });
    const FindContract = yield contracts_1.default.findOne({
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
    const updatedReports = { id, numContract, dateContract, typeContract, reports, customer };
    const UpdateEvents = (0, eventStory_1.updatedEventStory)(updatedReports, existedContract);
    UpdateEvents.map((event) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, raise_event_1.raiseEvent)(req.user.id, id, event); }));
    res.json({ FindContract });
}));
// Token verification middleware
function verifyToken(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    // console.log(token);
    if (!(token === null || token === void 0 ? void 0 : token.length)) {
        console.log("fgdfg");
        throw new Error("Authorization token is required");
    }
    jsonwebtoken_1.default.verify(token, secretKey, function (err, decoded) {
        if (err) {
            throw new Error("Error : " + err);
        }
        req.user = decoded;
    });
    next();
}
module.exports = router;
