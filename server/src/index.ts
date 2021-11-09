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

app.listen(5000, () =>
  console.log("Server in running on http://localhost:5000")
);

// Routes

app.use("/user", userRoutes);
app.use("/movie", movieRoutes);
