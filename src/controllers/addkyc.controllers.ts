import { Request, Response } from "express";
import { addNewBlockOnUserRegistration } from "../index";

export const addKycController = async (req: Request, res: Response) => {
  const body = req.body;
  const {
    address,
    citizenshipImageUrl,
    dob,
    email,
    firstname,
    lastname,
    phonenumber,
    profilePictureUrl,
    user,
  } = body;
  if (
    !firstname ||
    !lastname ||
    !dob ||
    !email ||
    !phonenumber ||
    !address ||
    !citizenshipImageUrl ||
    !profilePictureUrl
  ) {
    return res.json({ message: "fill the form" }).status(400);
  } else {
    const {id} = user;
    addNewBlockOnUserRegistration({
      firstname,
      lastname,
      dob,
      email,
      phonenumber,
      address,
      citizenshipImageUrl,
      profilePictureUrl,
      id,
    });
    res.json({ message: "success" }).status(200);
  }
};
