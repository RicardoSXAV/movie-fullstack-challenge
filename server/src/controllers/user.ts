import { Request, Response } from "express";

const login = (req: Request, res: Response) => {
  res.json({ message: "usuários" });
};

export default { login };
