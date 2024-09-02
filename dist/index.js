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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const todoRouter_1 = __importDefault(require("./router/todoRouter"));
require("dotenv/config");
exports.app = (0, express_1.default)();
const PORT = process.env.SERVER_PORT || 3002;
const corsOptions = {
    methods: "GET,PUT,POST,DELETE",
};
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.use(express_1.default.json());
// router
exports.app.use("/api", todoRouter_1.default);
// health check
exports.app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json("ok");
}));
// start server
exports.app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.dbConnect)();
    console.log(`Server is running on PORT ${PORT} and DB running on PORT ${process.env.DB_PORT}`);
}));
