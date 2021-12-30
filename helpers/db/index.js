import mysql from 'serverless-mysql';

export const conn = mysql({
	config: {
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		port: process.env.MYSQL_PORT,
		password: process.env.MYSQL_PASS,
		database: process.env.MYSQL_NAME,
		charset: 'utf8mb4_unicode_ci'
	}
});

export async function query(q, values) {
	try {
		const results = await conn.query(q, values);
		await conn.end();
		return results;
	} catch (e) {
		throw Error(e.message);
	}
}
