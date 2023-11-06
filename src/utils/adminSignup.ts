import Admin from "../models/Admin.model";
import hashPassword from "./passwordHash";
import dotenv from "dotenv";
dotenv.config();

export const registerAdmin = async () => {
  try {
    const adminData = {
      email: process.env.ADMIN_EMAIL!,
      password: process.env.ADMIN_PASSWORD!,
    };
    const hashedPassword = hashPassword(adminData.password);
    const admin = new Admin({ ...adminData, password: hashedPassword });
    await admin.save();
    console.log("admin registered successfully");
  } catch (err) {
    console.log(err);
  }
};
