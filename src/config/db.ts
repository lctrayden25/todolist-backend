import pg from "pg";
const { Pool } = pg;

// const createSchema = async () => {
// 	const query = `
// 			CREATE TABLE IF NOT EXISTS todos (
// 				id SERIAL PRIMARY KEY,
// 				name VARCHAR(255) NOT NULL
// 			);
// 		`;

// 	const res = await dbPool.query(query);
// 	if (res) {
// 		console.log("Database connected and table [todos] created if not exists");
// 	}
// };

export const dbPool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

export const dbConnect = async () => {
	try {
		const res = await dbPool.connect();
		// if (res) {
		// 	await createSchema();
		// }
	} catch (error) {
		console.log("Error: ", error);
		throw error;
	}
};
