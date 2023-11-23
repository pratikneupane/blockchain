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
    firstName,
    lastName,
    phoneNumber,
    profilePictureUrl,
    user,
  } = body;
  if (
    !firstName ||
    !lastName ||
    !dob ||
    !email ||
    !phoneNumber ||
    !address ||
    !citizenshipImageUrl ||
    !profilePictureUrl
  ) {
    return res.json({ message: "fill the form" }).status(400);
  } else {
    const { id } = user;
    const verified = false;
    const hash = addNewBlockOnUserRegistration({
      firstName,
      lastName,
      dob,
      email,
      phoneNumber,
      address,
      citizenshipImageUrl,
      profilePictureUrl,
      id,
      verified,
    });
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { hash: hash },
      { new: true }
    );

    console.log(updatedUser)

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: updatedUser , success: true }).status(200);
  }
};
