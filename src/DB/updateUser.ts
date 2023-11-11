import bcrypt from "bcrypt";
import UserModel from "./schema/users";
const updateUserPassword = async (id: number, name: string, username: string, password: string, role: "مدیر" | "کارمند") => {
  try {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) {
      throw new Error("کاربر وجود ندارد");
    }
    if (user.password === password) {
      throw new Error("رمز عبور تکراری است");
    }
    if (password.trim() === "") {
      user.set({ name, username, password: user.password, role });
      await user.save();
      return user;
    } else {
      bcrypt.hash(password, 10, async (hashErr: Error | undefined, hashedPassword: string) => {
        if (hashErr) {
          console.error(hashErr);
        } else {
          user.set({ name, username, password: hashedPassword, role });
          await user.save();
          return user;
        }
      });
    }
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
};

export default updateUserPassword;
