import express, { Express, Request, Response } from "express";
import { dbPool } from "../config/db";

export const getTodoList = async (
	req: Request,
	res: Response
): Promise<Response<JSON>> => {
	try {
		const result = await dbPool.query("SELECT * FROM todos");
		return res.status(200).json({ data: result.rows ?? [] });
	} catch (error) {
		return res.status(502).json({ error: "Internal Server Error" });
	}
};

export const createTodo = async (
	req: Request,
	res: Response
): Promise<Response<JSON>> => {
	try {
		const { name } = req.body;
		const query = `
			INSERT INTO todos (name) VALUES ($1) RETURNING *;
		`;
		const result = await dbPool.query(query, [name]);
		return res.status(200).json({ result: result.rows[0] });
	} catch (error) {
		return res.status(502).json({ error: "Internal Server Error" });
	}
};

export const updateTodo = async (
	req: Request,
	res: Response
): Promise<Response<JSON>> => {
	try {
		const { id } = req.params;
		const { name, status } = req.body;
		const updateQuery = `UPDATE todos SET name = $1, status = $2 WHERE id = $3 RETURNING *`;
		const result = await dbPool.query(updateQuery, [name, status, id]);
		if (result?.rows?.length === 0) {
			return res.status(404).json({ error: "No results" });
		}
		return res.status(200).json({ result: result.rows[0] });
	} catch (error) {
		return res.status(502).json({ error: "Internal Server Error" });
	}
};

export const deleteTodo = async (
	req: Request,
	res: Response
): Promise<Response<JSON>> => {
	try {
		const { id } = req.params;
		const deleteQuery = `DELETE FROM todos where id = $1 returning *`;
		const result = await dbPool.query(deleteQuery, [id]);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: `Todo [ID: ${id}] not found` });
		}

		return res.status(200).json({ result: result.rows[0] });
	} catch (error) {
		return res.status(502).json({ error: "Internal Server Error" });
	}
};
