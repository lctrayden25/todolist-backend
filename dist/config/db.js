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
exports.dbConnect = exports.dbPool = void 0;
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
exports.dbPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // ssl: true,
    // connectionString: process.env.SERVER_API_URL,
});
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.dbPool.connect();
        const query = `CREATE TABLE IF NOT EXISTS todos (
			id SERIAL PRIMARY KEY NOT NULL,
			name VARCHAR(255) NOT NULL,
			status VARCHAR(50) NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			completed_at TIMESTAMPTZ
		) `;
        const res = yield exports.dbPool.query(query);
    }
    catch (error) {
        console.log("Error: ", error);
        throw error;
    }
});
exports.dbConnect = dbConnect;
