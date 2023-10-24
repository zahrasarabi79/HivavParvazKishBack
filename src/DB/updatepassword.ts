import { IUpdatePasswordDto } from "../dto/IContractDto";
import UserModel from "./schema/users";

const updatePassword = async (username: string, password: string, oldPassword: string) => {
  try {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.password !== oldPassword) {
      throw new Error("رمز عبور معتبر نیست");
    }
    user.password = password;
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
};

export default updatePassword;
