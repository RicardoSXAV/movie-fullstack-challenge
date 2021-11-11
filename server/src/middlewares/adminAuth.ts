import { NextFunction } from "express";
import jwt from "jsonwebtoken";

export const adminAuth = async (req: any, res: any, next: NextFunction) => {
  try {
    const userToken = req.query.token;

    await jwt.verify(userToken, "JWT_SECRET");

    next();
  } catch (error) {
    console.log(error);
  }
};
