import { Request, Response } from "express";
import { blockchain } from "../index";

export const verifyBlock = (req: Request, res: Response) => {
  const { blockHash } = req.body;

  const block = blockchain.findOneByHash(blockHash);

  if (block) {
    const isValid = block.verifyBlock();
    res.status(200).json({ message: "verified" });
  } else {
    res.status(404).json({ message: "Block not found" });
  }
};
