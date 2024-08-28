import express, { Request, Response } from "express";

const app = express();

const PORT = 3000;

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

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
