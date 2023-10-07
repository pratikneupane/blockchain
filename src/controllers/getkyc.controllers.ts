import { Request, Response } from "express";
import { blockchain } from "../index";
import User from "../models/User.model";

export const getkycController = async (req: Request, res: Response) => {
  const { hash } = req.body;
  let block;
  if (hash) {
    block = blockchain.findOneByHash(hash);
  }
  if (!hash) {
    const { id } = req.body.user;
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
  if (block) {
    return res.status(200).json({ data: block.data });
  } else {
    return res.status(404).json({ error: "Block not found" });
  }
};
