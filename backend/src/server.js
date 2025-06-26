import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
const __dirname = path.resolve();
// connectDB();
//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRouter);

//use a syntax to prod
app.use(express.static(path.join(__dirname, "../frontend/dist")));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
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

// app.listen(PORT, () => {
//   console.log("server up on port ", PORT);
// });
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server up on port ", PORT);
  });
});
