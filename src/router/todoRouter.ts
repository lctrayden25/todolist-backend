import express from "express";
import {
	createTodo,
	deleteTodo,
	deleteAllTodo,
	getTodoList,
	updateTodo,
} from "../controller/todoController";

const todoRouter = express.Router();

todoRouter.get("/", getTodoList);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/id/:id", deleteTodo);
todoRouter.delete("/status/:status", deleteAllTodo);

export default todoRouter;
