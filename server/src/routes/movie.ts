import express from "express";
const router = express.Router();

import { adminAuth } from "../middlewares/adminAuth";
import movie from "../controllers/movie";

router.get("/", movie.list);
router.post("/", adminAuth, movie.addToCatalog);

export default router;
