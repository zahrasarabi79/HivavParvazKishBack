import bcrypt from "bcrypt";
import UserModel from "./schema/users";

const updatePassword = async (username: string, password: string, oldPassword: string) => {
  try {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
      throw new Error("User not found");
    } else {
      bcrypt.compare(oldPassword, user.password, async (err, result) => {
        if (err) {
          console.error(err, "eeee");
        } else if (result) {
          user.password = password;
          await user.save();
          return user;
        } else {
          throw new Error("رمز عبور معتبر نیست");
        }
      });
    }
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
};

export default updatePassword;
