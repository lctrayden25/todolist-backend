import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { dbConnect, dbPool } from "./config/db";
import todoRouter from "./router/todoRouter";
import "dotenv/config";

export const app: Express = express();
const PORT = process.env.SERVER_PORT || 3002;

const corsOptions = {
	methods: "GET,PUT,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());

// router
app.use("/api", todoRouter);

// health check
app.get("/", async (req: Request, res: Response) => {
	return res.status(200).json("ok");
});

// start server
app.listen(PORT, async (): Promise<void> => {
	await dbConnect();
	console.log(
		`Server is running on PORT ${PORT} and DB running on PORT ${process.env.DB_PORT}`
	);
});
