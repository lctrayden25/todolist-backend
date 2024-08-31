"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const todoRouter = express_1.default.Router();
todoRouter.get("/", todoController_1.getTodoList);
todoRouter.post("/", todoController_1.createTodo);
todoRouter.put("/:id", todoController_1.updateTodo);
todoRouter.delete("/:id", todoController_1.deleteTodo);
exports.default = todoRouter;
