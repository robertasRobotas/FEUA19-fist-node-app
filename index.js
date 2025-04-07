import "dotenv/config";
import express from "express";
import cors from "cors";
import tasksRouter from "./src/routes/task.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use(tasksRouter);

app.use((req, res) => {
  return res.status(404).json({ message: "Endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`APP STARTED ON PORT ${process.env.PORT}`);
});
