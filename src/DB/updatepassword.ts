import bcrypt from "bcrypt";
import UserModel from "./schema/users";
import { error } from "console";

const updatePassword = async (username: string, password: string, oldPassword: string) => {
  try {
    const user = await UserModel.findOne({ where: { username } });
    console.log(user?.password);

    if (!user) {
      throw { status: 404, message: "User not found" };
    } else {
      const hashedOldPassword = await bcrypt.hash(oldPassword, 10);
      console.log(hashedOldPassword);

      const result = await bcrypt.compare(oldPassword, user?.password);

      if (result) {
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        return { status: 200, message: "رمز عبور با موفقیت ویرایش شد" };
      } else {
        throw new Error("رمز عبور معتبر نیست");
      }
    }
  } catch (error: any) {
    console.error(error);
    throw { status: 500, message: error.message };
  }
};

export default updatePassword;
