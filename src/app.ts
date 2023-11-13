import express = require("express");
const cors = require("cors");
import * as bodyParser from "body-parser";
import DB from "./DB/server";

const api: express.Application = express();
const loginRoute = require("./routes/login");
const port: number = 3001;
const LOCAL_IP = "0.0.0.0";
api.use(cors());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use("/", loginRoute);

api.listen(port, LOCAL_IP, () => {
  console.log(`Server is running at http://${LOCAL_IP}:${port}`);
  DB.creatTable();
});
