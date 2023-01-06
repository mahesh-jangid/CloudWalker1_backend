import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";

import cors from "cors";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/users", userRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is Running....");
  });
}

const PORT = process.env.PORT || 5300;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
