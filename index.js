import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import tasksRouter from "./src/routes/task.js";
import usersRouter from "./src/routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to DB!"))
  .catch((err) => {
    console.log(err);
  });

app.use(usersRouter);
app.use(tasksRouter);

app.use((req, res) => {
  return res.status(404).json({ message: "Endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`APP STARTED ON PORT ${process.env.PORT}`);
});
