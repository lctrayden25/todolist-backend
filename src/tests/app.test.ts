import request from "supertest";
import { app } from "..";
import { TodoStatus } from "../helper/enum";

describe("Todo GET /api", () => {
	const todoGetRequest = () => request(app).get("/api");

	it("should return 200 ok status and todo list array", async () => {
		const res = await todoGetRequest();
		expect(res.statusCode).toBe(200);
		expect(typeof res.body).toEqual(expect.arrayContaining([]));
		expect(res.body.data.length).toBeGreaterThanOrEqual(0);
	});
});

describe("Todo POST /api", () => {
	const todoPostRequest = () => request(app).post("/api");

	it("should return 200 ok status and todo object", async () => {
		const res = await todoPostRequest().send({
			name: "testing case",
		});
		expect(res.statusCode).toBe(200);
		expect(typeof res.body).toBe("object");
	});
});

describe("Todo PUT /api/:id", () => {
	const todoPutRequest = (id: number | string) =>
		request(app).put(`/api/${id}`);

	it("should return 200 ok status", async () => {
		const res = await todoPutRequest(33); // pick one of the existing todo id for testing, e.g. 33
		expect(res.statusCode).toBe(200);
	});

	it("should return 404 if no result update", async () => {
		const res = await todoPutRequest(112345);
		expect(res.statusCode).toBe(404);
	});

	it("should return item object if update successfully", async () => {
		const res = await todoPutRequest(33); // pick one of the existing todo id for testing, e.g. 33, otherwise failed
		expect(typeof res.body).toBe("object");
	});
});

describe("Todo DELETE by ID /api/id/:id", () => {
	const deleteDeleteRequest = (id: number | string) =>
		request(app).delete(`/api/id/${id}`);

	it("should return 200 ok status", async () => {
		const res = await deleteDeleteRequest(50); // pick one of the existing todo id for testing, e.g. 33, otherwise failed
		expect(res.statusCode).toEqual(200);
	});
});

describe("Todo DELETE by status /api/status/:status", () => {
	const deleteDeleteRequest = (status: string) =>
		request(app).delete(`/api/status/${status}`);

	it("should return 200 ok status if delete all completed todos", async () => {
		// pick one of the existing todo id for testing, e.g. complete | incomplete,
		// otherwise failed
		const res = await deleteDeleteRequest(TodoStatus.Complete);
		expect(res.statusCode).toEqual(200);
	});
});
