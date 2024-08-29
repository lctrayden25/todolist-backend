// postgres connect
import pg from "pg";
const { Client } = pg;

const client = new Client({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

export const dbConnect = async () => {
	await client.connect();

	const res = await client.query("SELECT $1::text as message", [
		"Hello world!",
	]);
	console.log(res.rows[0].message); // Hello world!
	await client.end();
};
