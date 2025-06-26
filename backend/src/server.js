import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
// connectDB();
//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRouter);

// app.get("/api/notes", (req, res) => {
//   res.status(200).send("You got 20 notes");
// });

// app.post("/api/notes", (req, res) => {
//   res.status(201).send("Note created Successfully!");
// });

// app.put("/api/notes/:id", (req, res) => {
//   res.status(200).send("Note Updated Successfully!");
// });

// app.delete("/api/notes/:id", (req, res) => {
//   res.status(200).send("Note Deleted Successfully!");
// });
// passwordf for mongo='IvJqkudVCOr2hCLc'
// connection string='mongodb+srv://bhaisaheb2022:IvJqkudVCOr2hCLc@cluster0.ml5y0nc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// app.listen(PORT, () => {
//   console.log("server up on port ", PORT);
// });
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server up on port ", PORT);
  });
});
