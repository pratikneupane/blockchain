import { Request, Response } from "express";
import { fiBlockchain } from "../index";

export const getAllBlocksController = (req: Request, res: Response) => {
  try {
    const { email } = req.body.user;

    const blockchain = fiBlockchain.getInstitutionByEmail(email);

    if (!blockchain) {
      return res
        .status(404)
        .json({ message: "Blockchain not found for the given email" });
    }

    return res.json({ blockchain: blockchain.chain }).status(200);
  } catch (error) {
    console.error("Error parsing JSON data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
