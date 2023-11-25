// FinancialInstitutionController.ts

import { Request, Response } from "express";
import FinancialInstitutionBlockchain from "../classes/FinancialInstitutionBlockchain";
import hashPassword from "../utils/passwordHash";
import FI from "../models/FI.model";

export const registerFinancialInstitution = async (
  req: Request,
  res: Response
) => {
  try {
    const body = req.body;
    const { name, registrationNumber, email, password, profilePictureUrl } =
      body;
    const existingUser = await FI.findOne({ email });
    if (existingUser) {
      return res
        .json({ message: "user with this email already exist" })
        .status(400);
    } else {
      const hashedPassword = hashPassword(password);
      const genesisBlockDetails = {
        name,
        registrationNumber,
        email,
        password: hashedPassword,
        profilePictureUrl,
      };
      const newUser = new FI(genesisBlockDetails);
      newUser.save();
      const newInstitutionBlockchain = new FinancialInstitutionBlockchain(
        genesisBlockDetails
      );
      return res
        .json({ message: "success", newInstitutionBlockchain })
        .status(200);
    }
  } catch (err) {
    console.error(err);
    return res.json({ message: "error" }).status(500);
  }
};
