import { Request, Response } from "express";
import { blockchain } from "../index";

export const getAllBlocksController = (req: Request, res: Response) => {
  try {
    const allBlockData = blockchain.chain.map((block) => {
      return block.data;
    });
    return res.status(200).json({ allBlockData });
  } catch (error) {
    console.error("Error parsing JSON data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
