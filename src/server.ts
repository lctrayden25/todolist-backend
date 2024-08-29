import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { dbConnect, dbPool } from "./config/db";
import "dotenv/config";

const app: Express = express();
const PORT = process.env.SERVER_PORT || 3002;

const corsOptions = {
	methods: "GET,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());

//get todo
app.get("/", async (req: Request, res: Response): Promise<Response<JSON>> => {
	try {
		const result = await dbPool.query("SELECT * FROM todos");
		return res.status(200).json({ data: result.rows ?? [] });
	} catch (error) {
		return res.status(502).json({ error: "Internal Server Error" });
	}
});

//create todo
app.post("/", async (req: Request, res: Response): Promise<Response<JSON>> => {
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
});

// update todo
app.put(
	"/:id",
	async (req: Request, res: Response): Promise<Response<JSON>> => {
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
	}
);

//delete todo
app.delete(
	"/:id",
	async (req: Request, res: Response): Promise<Response<JSON>> => {
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
	}
);

app.listen(PORT, async (): Promise<void> => {
	await dbConnect();
	console.log(
		`Server is running on PORT ${PORT} and DB running on PORT ${process.env.DB_PORT}`
	);
});
