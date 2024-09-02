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
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("..");
const enum_1 = require("../helper/enum");
describe("Todo GET /api", () => {
    const todoGetRequest = () => (0, supertest_1.default)(__1.app).get("/api");
    it("should return 200 ok status and todo list array", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield todoGetRequest();
        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toEqual(expect.arrayContaining([]));
        expect(res.body.data.length).toBeGreaterThanOrEqual(0);
    }));
});
describe("Todo POST /api", () => {
    const todoPostRequest = () => (0, supertest_1.default)(__1.app).post("/api");
    it("should return 200 ok status and todo object", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield todoPostRequest().send({
            name: "testing case",
        });
        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe("object");
    }));
});
describe("Todo PUT /api/:id", () => {
    const todoPutRequest = (id) => (0, supertest_1.default)(__1.app).put(`/api/${id}`);
    it("should return 200 ok status", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield todoPutRequest(33); // pick one of the existing todo id for testing, e.g. 33
        expect(res.statusCode).toBe(200);
    }));
    it("should return 404 if no result update", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield todoPutRequest(112345);
        expect(res.statusCode).toBe(404);
    }));
    it("should return item object if update successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield todoPutRequest(33); // pick one of the existing todo id for testing, e.g. 33, otherwise failed
        expect(typeof res.body).toBe("object");
    }));
});
describe("Todo DELETE by ID /api/id/:id", () => {
    const deleteDeleteRequest = (id) => (0, supertest_1.default)(__1.app).delete(`/api/id/${id}`);
    it("should return 200 ok status", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield deleteDeleteRequest(50); // pick one of the existing todo id for testing, e.g. 33, otherwise failed
        expect(res.statusCode).toEqual(200);
    }));
});
describe("Todo DELETE by status /api/status/:status", () => {
    const deleteDeleteRequest = (status) => (0, supertest_1.default)(__1.app).delete(`/api/status/${status}`);
    it("should return 200 ok status if delete all completed todos", () => __awaiter(void 0, void 0, void 0, function* () {
        // pick one of the existing todo id for testing, e.g. complete | incomplete,
        // otherwise failed
        const res = yield deleteDeleteRequest(enum_1.TodoStatus.Complete);
        expect(res.statusCode).toEqual(200);
    }));
});
