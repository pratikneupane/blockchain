import { Request, Response } from "express";

export const addKycController = async (req: Request, res: Response) => {
  const body = req.body;
  const {
    address,
    citizenshipImage,
    dob,
    email,
    firstname,
    lastname,
    phonenumber,
    profilepic,
    user
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
    console.log(user);
    res.json({ message: "success" }).status(200);
  }
};
