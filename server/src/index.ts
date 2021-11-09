import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/user";
import movieRoutes from "./routes/movie";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, () =>
  console.log("Server in running on http://localhost:5000")
);

mongoose
  .connect(process.env.DB_URL || "")
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log(error));

// Routes

app.get("/", (req, res) => {
  return res.json({
    message: "Movie App API",
  });
});

app.use("/user", userRoutes);
app.use("/movie", movieRoutes);
