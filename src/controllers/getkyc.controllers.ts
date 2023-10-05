import { Request, Response } from "express";
import { blockchain } from "../index";

export const getkycController = (req: Request, res: Response) => {
  const { hash } = req.body;
  if (!hash) {
    return res.status(400).json({ error: "Hash parameter is missing" });
  }
  for (const block of blockchain.chain) {
    if (block.hash === hash) {
      return res.status(200).json({ data: block.data });
    }
  }
  return res.status(404).json({ error: "Block not found" });
};
