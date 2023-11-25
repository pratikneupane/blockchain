import { Request, Response } from "express";
import { blockchain, fiBlockchain } from "../index";

export const getkycController = async (req: Request, res: Response) => {
  const { hash } = req.body;
  const { email } = req.body.user;
  const fiblock = fiBlockchain.getInstitutionByEmail(email);
  if (hash) {
    const block = blockchain.findOneByHash(hash);
    fiblock?.addClientBlock(hash);
    return res.status(200).json({ data: fiblock?.chain });
  } else {
    return res.status(404).json({ error: "Block not found" });
  }
};
