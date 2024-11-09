import express from "express";
import { addNewTodo, fetchTodos } from "../controllers/todos.js";

const router = express.Router();

router.get("/", fetchTodos);

router.post("/", addNewTodo);

export default router;
