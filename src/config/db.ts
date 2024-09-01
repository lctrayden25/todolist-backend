import pg from "pg";
const { Pool } = pg;

export const dbPool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	// ssl: true,
	// connectionString: process.env.SERVER_API_URL,
});

export const dbConnect = async () => {
	try {
		await dbPool.connect();
		const query = `Create Table IF NOT EXISTS todos (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			status VARCHAR(50) NOT NULL
		) `;
		await dbPool.query(query);
	} catch (error) {
		console.log("Error: ", error);
		throw error;
	}
};
