import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

const verifyToken = (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization!;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  if (!token.startsWith("Bearer")) {
    return res.status(403).send("Invalid Token");
  }
  try {
    const decoded = jwt.verify(token.substr(7), process.env.JWT_SECRET!);
    req.body.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
