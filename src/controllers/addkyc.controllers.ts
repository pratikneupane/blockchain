import { Request, Response } from "express";
import { addNewBlockOnUserRegistration } from "../index";

export const addKycController = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  const {
    address,
    citizenshipImage,
    dob,
    email,
    firstname,
    lastname,
    phonenumber,
    profilepic,
    user,
  } = body;
  if (
    !firstname ||
    !lastname ||
    !dob ||
    !email ||
    !phonenumber ||
    !address ||
    !citizenshipImage ||
    !profilepic
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
      citizenshipImage,
      profilepic,
      id,
    });
    res.json({ message: "success" }).status(200);
  }
};
