import { Request, Response } from "express";
import User from "../models/User.model";
import hashPassword from "../utils/passwordhash";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { email, password, firstname, lastname } = body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .json({ message: "user with this email already exist" })
        .status(400);
    } else {
      const hashedPassword = hashPassword(password);
      const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });
      newUser.save();
      return res.json({ message: "success" }).status(200);
    }
  } catch (err) {
    console.log(err);
    return res.json({ message: "error" }).status(500);
  }
};
