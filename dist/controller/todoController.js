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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllTodo = exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodoList = void 0;
const db_1 = require("../config/db");
const enum_1 = require("../helper/enum");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
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
        if (!name)
            return res.status(200).json({ error: "Missing todo item." });
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
        const now = (0, dayjs_1.default)().tz("Asia/Hong_Kong").format("YYYY-MM-DD HH:mm:ss.SSSZ");
        const { id } = req.params;
        if (!id) {
            return res.status(422).json({ error: "Missing todo ID" });
        }
        const updateQuery = `UPDATE todos SET status = $1, completed_at = $3, updated_at = $3 WHERE id = $2 RETURNING *`;
        const result = yield db_1.dbPool.query(updateQuery, [
            enum_1.TodoStatus.Complete,
            id,
            now,
        ]);
        if (((_a = result === null || result === void 0 ? void 0 : result.rows) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return res.status(404).json({ error: "No results" });
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.status(200).json({ result: result.rows[0] });
    }
    catch (error) {
        return res.status(502).json({ error });
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
        return res.status(200).json({ delete: true });
    }
    catch (error) {
        return res.status(502).json({ error });
    }
});
exports.deleteTodo = deleteTodo;
const deleteAllTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.params;
        if (!status)
            return res.status(200).json({ error: "Missing status value to delete" });
        const query = `DELETE FROM todos WHERE status = $1 returning *`;
        const result = yield db_1.dbPool.query(query, [status]);
        return res.status(200).json({ delete: true });
    }
    catch (error) {
        return res.status(502).json({ error });
    }
});
exports.deleteAllTodo = deleteAllTodo;
