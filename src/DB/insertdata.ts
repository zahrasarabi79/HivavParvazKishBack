import {IUsers } from "../app";
import Users from "./schema/person";

const insertData = async (datainput: IUsers) => {

  try {
    await Users.create({
      username: datainput.username,
      password: datainput.password,
    });

    console.log("done"); 
  } catch (error) {
    console.log(error);
  }
};
export default { insertData };
