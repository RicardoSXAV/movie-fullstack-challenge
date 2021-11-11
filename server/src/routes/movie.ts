import express from "express";
const router = express.Router();

import { adminAuth } from "../middlewares/adminAuth";
import movie from "../controllers/movie";

router.get("/catalog", adminAuth, movie.getCatalog);
router.post("/catalog", adminAuth, movie.addToCatalog);
router.delete("/catalog/:id", adminAuth, movie.removeFromCatalog);
router.get("/", movie.list);
router.get("/:id", movie.getInfo);

export default router;
