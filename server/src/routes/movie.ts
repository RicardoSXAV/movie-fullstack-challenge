import express from "express";
const router = express.Router();

import { adminAuth } from "../middlewares/adminAuth";
import movie from "../controllers/movie";

router.get("/", movie.list);
router.get("/catalog", adminAuth, movie.getCatalog);
router.post("/catalog", adminAuth, movie.addToCatalog);

export default router;
