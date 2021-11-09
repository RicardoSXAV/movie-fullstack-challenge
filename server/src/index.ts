import express from "express";
import cors from "cors";

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

// Routes

app.get("/", (req, res) => {
  return res.json({
    message: "Movie App API",
  });
});
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);
