import { IUserDto } from "../dto/IContractDto";
import UserModel from "./schema/users";

const insertUser = async ({ name, username, password, role }: IUserDto) => {
  try {
    const contract = await UserModel.create({
      name,
      username,
      password,
      role,
    });
    if (!contract) return false;
    return contract;
  } catch (error) {
    console.log(error);
  }
};
export default { insertUser };
