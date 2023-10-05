import { Request, Response } from "express";
import Admin from "../models/Admin.model";
import hashPassword from "./passwordhash";

export const registerAdmin = async () => {
  try {
    const adminData = {
      email: "admin@gmail.com",
      password: "adminadmin",
    };

    const hashedPassword = hashPassword(adminData.password);
    const admin = new Admin({ ...adminData, password: hashedPassword });

    await admin.save();

   console.log("admin registerd succesfullly")
  } catch (err) {
    console.log(err);
    
  }
};
