import express from "express";
import {
	createTodo,
	deleteAllTodo,
	deleteTodo,
	getTodoList,
	updateTodo,
} from "../controller/todoController";

const todoRouter = express.Router();

todoRouter.get("/", getTodoList);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);
todoRouter.delete("/:status", deleteAllTodo);

export default todoRouter;
