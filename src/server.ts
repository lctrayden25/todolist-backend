import express, { Request, Response } from "express";
import { dbConnect } from "./config/db";
import "dotenv/config";

const app = express();

const PORT = process.env.SERVER_PORT || 3000;

//get todo
app.get("/", async (req: Request, res: Response) => {
	res.send("fetch todo");
});

app.post("/", async (req: Request, res: Response) => {
	res.send("create todo");
});

app.delete("/:id", async (req: Request, res: Response) => {
	res.send("delete todo");
});

app.get("/setup", async (req: Request, res: Response) => {
	res.send("setup db");
});

app.listen(PORT, async () => {
	await dbConnect();
	console.log(process.env.SERVER_PORT);
	console.log(`Server is running on PORT ${PORT}`);
});
