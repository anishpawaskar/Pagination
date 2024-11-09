import mongoose from "mongoose";

const todosSchema = new mongoose.Schema(
  {
    title: String,
    desscription: String,
    isCompleted: Boolean,
  },
  { timestamps: true }
);

const Todos = mongoose.model("Todos", todosSchema);

export const createTodoModel = async (payload) => {
  const newTodo = new Todos(payload);
  return await newTodo.save();
};

export const getTodosModel = async (filter) => {
  const { page = 1, size } = filter;

  const totalTodos = await Todos.countDocuments();
  const totalPages = Math.ceil(totalTodos / size);

  const nextPage = page < totalPages ? parseInt(page) + 1 : "";
  console.log("nextPage", nextPage, console.log("total page", totalPages));
  const prevPage = page > 1 ? parseInt(page) - 1 : "";

  const todos = await Todos.find({})
    .limit(size)
    .sort({ createdAt: -1 })
    .skip((page - 1) * size)
    .exec();
  return { todos, nextPage, prevPage };
};
