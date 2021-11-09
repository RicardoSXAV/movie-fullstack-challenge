import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/User";

const getCurrent = (req: Request, res: Response) => {
  res.json({ message: "usuários" });
};

const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "adm123") {
    const token = jwt.sign({ username: "admin" }, "JWT_SECRET", {
      expiresIn: "2h",
    });

    return res.status(200).json({ error: false, username, token });
  } else {
    return res
      .status(401)
      .json({ error: true, message: "Usuário e senha incorretos." });
  }
};

export default { getCurrent, login };
