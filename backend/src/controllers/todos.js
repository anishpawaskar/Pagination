import { createTodoModel, getTodosModel } from "../models/todos.js";

export const addNewTodo = async (req, res) => {
  try {
    const body = req.body;
    const todo = await createTodoModel(body);

    res.status(201).json({ message: "Todo created successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error while creating new todo." });
  }
};

export const fetchTodos = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { todos, nextPage, prevPage } = await getTodosModel({ page, size });
    res.status(200).json({
      message: "Todos returned successfully.",
      todos,
      next: nextPage,
      prev: prevPage,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error while fetching todos" });
  }
};
