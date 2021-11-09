import { NextFunction } from "express";
import jwt from "jsonwebtoken";

export const adminAuth = (req: any, res: any, next: NextFunction) => {
  const userToken = req.body.token;

  const decodedToken = jwt.verify(userToken, "JWT_SECRET");

  next();
};
