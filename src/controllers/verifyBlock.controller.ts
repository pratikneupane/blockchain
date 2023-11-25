import { Request, Response } from "express";
import { blockchain } from "../index";
import User from "../models/User.model";

export const verifyBlock = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const user = await User.findById(id);
    const userHash = user && user.hash;

    if (!userHash) {
      return res.status(404).json({ message: "User not found or hash is empty" });
    }

    const block = blockchain.findOneByHash(userHash);

    if (block) {
      block.data.verified = true;
      res.status(200).json({ message: "Block verified" });
    } else {
      res.status(404).json({ message: "Block not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
