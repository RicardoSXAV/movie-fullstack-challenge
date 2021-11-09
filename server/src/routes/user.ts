import express from "express";
const router = express.Router();

import user from "../controllers/user";
import { adminAuth } from "../middlewares/adminAuth";

router.get("/", adminAuth, user.getCurrent);
router.post("/", user.login);

export default router;
