import { Request, Response } from "express";
import { blockchain } from "../index";

export const verifyBlock = (req: Request, res: Response) => {
    const { blockHash } = req.body;

    const block = blockchain.findOneByHash(blockHash);

    if (block) {
        const isValid = block.verifyBlock();
        if (isValid) {
            res.status(200).json({ message: "Block is valid" });
        } else {
            res.status(400).json({ message: "Block is invalid" });
        }
    } else {
        res.status(404).json({ message: "Block not found" });
    }
}
