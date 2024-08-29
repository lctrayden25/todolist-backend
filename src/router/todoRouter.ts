import express from "express";
import {
	createTodo,
	deleteTodo,
	getTodoList,
	updateTodo,
} from "../controller/todoController";

const todoRouter = express.Router();

todoRouter.get("/", getTodoList);
todoRouter.post("/", createTodo);
todoRouter.put("/", updateTodo);
todoRouter.delete("/", deleteTodo);

export default todoRouter;
