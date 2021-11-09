import express from "express";
const router = express.Router();

import movie from "../controllers/movie";

router.get("/", movie.list);

export default router;
