"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodoList = void 0;
const db_1 = require("../config/db");
const enum_1 = require("../helper/enum");
const getTodoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield db_1.dbPool.query("SELECT * FROM todos");
        return res.status(200).json({ data: (_a = result.rows) !== null && _a !== void 0 ? _a : [] });
    }
    catch (error) {
        return res.status(502).json({ error });
    }
});
exports.getTodoList = getTodoList;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const query = `
			INSERT INTO todos (name, status) VALUES ($1, $2) RETURNING *;
		`;
        const result = yield db_1.dbPool.query(query, [name, enum_1.TodoStatus.Incomplete]);
        return res.status(200).json({ result: result.rows[0] });
    }
    catch (error) {
        return res.status(502).json({ error });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        // const { name, status } = req.body as Request["body"];
        const updateQuery = `UPDATE todos SET status = $1 WHERE id = $2 RETURNING *`;
        const result = yield db_1.dbPool.query(updateQuery, [enum_1.TodoStatus.Complete, id]);
        console.log("result: ", result);
        if (((_a = result === null || result === void 0 ? void 0 : result.rows) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return res.status(404).json({ error: "No results" });
        }
        return res.status(200).json({ result: result.rows[0] });
    }
    catch (error) {
        return res.status(502).json({ error: error });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(404).json({ error: "Missing todo ID" });
        const deleteQuery = `DELETE FROM todos where id = $1 returning *`;
        const result = yield db_1.dbPool.query(deleteQuery, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: `Todo [ID: ${id}] not found` });
        }
        return res.status(200).json({ result: result.rows[0] });
    }
    catch (error) {
        return res.status(502).json({ error: error });
    }
});
exports.deleteTodo = deleteTodo;
