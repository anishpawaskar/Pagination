import express from "express";
import todosRoute from "./todos.js";

const app = express.Router();

app.use("/todos", todosRoute);

export default app;
