import hashPassword from "../utils/passwordhash";
import User from "../models/User.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";

export const verifyUser = async (req: Request, res: Response) => {
  const body = req.body;
  const { email, password } = body;
  console.log(email, password);
  try {
    const query = User.findOne({ email: email });
    const user = await query;
    !user
      ? res.status(404).json({ message: "User not found" })
      : user.password !== hashPassword(password)
      ? res.json({ message: "you entered wrong password" }).status(401)
      : res
          .status(200)
          .json({
            message: "success",
            token: jwt.sign(
              { email: user.email, id: user._id },
              process.env.JWT_SECRET!
            ),
          });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Internal Server Error" }).status(500);
  }
};