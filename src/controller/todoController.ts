import { Request, Response } from "express";
import { dbPool } from "../config/db";
import { TodoStatus } from "../helper/enum";

export const getTodoList = async (
	req: Request,
	res: Response
): Promise<Response<JSON>> => {
	try {
		const result = await dbPool.query("SELECT * FROM todos");
		return res.status(200).json({ data: result.rows ?? [] });
	} catch (error) {
		return res.status(502).json({ error });
	}
};

export const createTodo = async (
	req: Request,
	res: Response
): Promise<Response<JSON>> => {
	try {
		const { name } = req.body as Request["body"];
		if (!name) return res.status(200).json({ error: "Missing todo item." });
		const query = `
			INSERT INTO todos (name, status) VALUES ($1, $2) RETURNING *;
		`;
		const result = await dbPool.query(query, [name, TodoStatus.Incomplete]);
		return res.status(200).json({ result: result.rows[0] });
	} catch (error) {
		return res.status(502).json({ error });
	}
};

export const updateTodo = async (
	req: Request,
	res: Response
): Promise<Response<JSON>> => {
	try {
		const { id } = req.params as Request["params"];
		// const { name, status } = req.body as Request["body"];
		const updateQuery = `UPDATE todos SET status = $1 WHERE id = $2 RETURNING *`;
		const result = await dbPool.query(updateQuery, [TodoStatus.Complete, id]);

		if (result?.rows?.length === 0) {
			return res.status(404).json({ error: "No results" });
		}
		return res.status(200).json({ result: result.rows[0] });
	} catch (error) {
		return res.status(502).json({ error });
	}
};

export const deleteTodo = async (
	req: Request,
	res: Response
): Promise<Response<JSON>> => {
	try {
		const { id } = req.params as Request["params"];
		if (!id) return res.status(404).json({ error: "Missing todo ID" });

		const deleteQuery = `DELETE FROM todos where id = $1 returning *`;
		const result = await dbPool.query(deleteQuery, [id]);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: `Todo [ID: ${id}] not found` });
		}

		return res.status(200).json({ result: result.rows[0] });
	} catch (error) {
		return res.status(502).json({ error });
	}
};

export const deleteAllTodo = async (
	req: Request,
	res: Response
): Promise<Response<JSON>> => {
	try {
		const { status } = req?.params as Request["params"];
		const query = `DELETE * FROM todos where status = $1 returning *`;
		const result = await dbPool.query(query, [status]);
		return res.status(200).json({ deleted: true });
	} catch (error) {
		return res.status(502).json({ error });
	}
};
