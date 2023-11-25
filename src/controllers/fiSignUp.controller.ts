// FinancialInstitutionController.ts

import { Request, Response } from "express";
import FinancialInstitutionBlockchain from "../classes/FinancialInstitutionBlockchain";
import hashPassword from "../utils/passwordHash";

export const registerFinancialInstitution = async (
  req: Request,
  res: Response
) => {
  try {
    const body = req.body;
    const { name, registrationNumber, email, password, profilePictureUrl } = body;
    const hashedPassword = hashPassword(password);
    const genesisBlockDetails = {
      name,
      registrationNumber,
      email,
      password: hashedPassword,
      profilePictureUrl
    };
    const newInstitutionBlockchain = new FinancialInstitutionBlockchain(genesisBlockDetails);

    return res.json({ message: "success", newInstitutionBlockchain }).status(200);
  } catch (err) {
    console.error(err);
    return res.json({ message: "error" }).status(500);
  }
};
