import { Request, Response } from "express";
import { blockchain } from "../index";
import User from "../models/User.model";

export const verifyBlock = async (req: Request, res: Response) => {
  const { id } = req.body;
  console.log(id)
  console.log(req.body)
  let block;
  if (id) {
    try {
      const user = await User.findById(id);
      const userHash = user && user.hash;
      if(userHash === ""){
        return res.json({message: "error"}).status(404);
      }
      block = blockchain.findOneByHash(userHash!);
    } catch (err) {
      console.log(err);
      res.json({ message: "error" }).status(500);
    }
  }
  if(block) {
    block.data.verified = true;
    res.status(200).json({ message: "verified" });
  } else {
    res.status(404).json({ message: "Block not found" });
  }
};
