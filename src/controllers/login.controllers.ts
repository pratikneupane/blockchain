import hashPassword from "../utils/passwordhash";
import User from "../models/User.model";
import { Request, Response } from "express";

export const verifyUser = async (req: Request, res: Response) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const query = User.findOne({ email: email });
    const user = await query;
    !user
      ? res.status(404).json({ message: "User not found" })
      : user.password !== hashPassword(password)
        ? res.json({ message: "you entered wrong password" }).status(401)
        : res.json({ message: "you entered correct password" }).status(201);
  } catch (err) {
    console.log(err);
    return res.json({ message: "Internal Server Error" }).status(500);
  }
};


