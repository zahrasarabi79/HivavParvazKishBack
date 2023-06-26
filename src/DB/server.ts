import { Sequelize } from "sequelize-typescript";

const database = creatDbInstance();

function creatDbInstance() {
  return new Sequelize({
    database: "pgs",
    dialect: "mysql",
    username: "root",
    password: "102030",
    models: [__dirname + "/schema"],
    logging: false,
  });
}

const creatTable = async () => {
  try {
    await database.authenticate();
    await database.sync();
    console.log("creat database");
  } catch (error) {
    return console.log(error);
  }
};

export default { creatTable, creatDbInstance, database };
