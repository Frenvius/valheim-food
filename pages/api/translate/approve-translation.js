import { conn } from 'helpers/db';
import { query } from 'helpers/db';
import { apiHandler } from 'helpers/api';

const handler = async (req, res) => {
	const { language, json, id } = req.body;
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' });
		return;
	}

	query(`SELECT strings FROM languages WHERE name = '${language}'`).then( async (result) => {
		const strings = JSON.parse(result[0].strings.replace(/\\/g,""));
		const parsedJson = JSON.parse(json);
		const newJson = { ...strings, ...parsedJson };
		const jsonStr = JSON.stringify(newJson);
		await query(`UPDATE languages SET strings = ${conn.escape(jsonStr)} WHERE name = '${language}'`);
		await query(`DELETE FROM translations WHERE id = ${id}`);
	});

	res.status(200).send({ message: 'OK' });
};

export default apiHandler(handler);
