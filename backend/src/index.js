import express from "express";
import cors from "cors";
import { connectToDb } from "../configs/database.js";
import indexRouter from "./routes/index.js";

const app = express();

connectToDb();
app.use(cors());
app.use(express.json());
app.use(indexRouter);

app.get("/", (req, res) => {
  res.send("Helo world");
});

app.listen(3000, () => {
  console.log(`Server is running on PORT: 3000`);
});
