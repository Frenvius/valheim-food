import { query } from 'helpers/db';
import { conn } from 'helpers/db';

const handler = async (req, res) => {
	const { language, data } = req.body;
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' });
		return;
	}

	const json = JSON.stringify(data);
	console.log(`INSERT INTO translations (language, json) VALUES ('${language}', ${conn.escape(json)})`)

	await query(`INSERT INTO translations (language, json) VALUES ('${language}', ${conn.escape(json)})`);
	res.status(200).send({ message: 'OK' });
}

export default handler;