import { Request, Response } from "express";
import { addNewBlockOnUserRegistration } from "../index";
import User from "../models/User.model";

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
    const { id } = user;
    const hash = addNewBlockOnUserRegistration({
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
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { hash: hash },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: updatedUser }).status(200);
  }
};
