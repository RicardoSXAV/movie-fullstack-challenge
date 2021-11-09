import express from "express";
const router = express.Router();

import user from "../controllers/user";

router.get("/", user.login);

export default router;
