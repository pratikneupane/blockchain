import { Request, Response } from "express";
import User from "../models/User.model";

export const profileController = async (req: Request, res: Response) => {
    const {id, email} = req.body.user;
    try {
       const user = await User.findById(id)
       res.json(user).status(200)
    } catch (err) {
        console.log(err);
        res.json({"message": "error"}).status(500)
    }
}