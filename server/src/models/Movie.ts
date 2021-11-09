import mongoose from "mongoose";

type MovieDocument = mongoose.Document & {
  id: string;
  image: object;
  runningTimeInMinutes: number;
  title: string;
  titleType: string;
  year: number;
};

const MovieSchema = new mongoose.Schema(
  {
    id: String,
    image: Object,
    runningTimeInMinutes: Number,
    title: String,
    titleType: String,
    year: Number,
  },
  { timestamps: true }
);

export const Movie = mongoose.model<MovieDocument>("Movie", MovieSchema);
