import { query } from '../../../lib/db';
import fs from 'fs';

const handler = async (req, res) => {
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' });
		return;
	}

	await saveStringsToFile(req.body.language, req.body.json, req.body.id);
	res.status(200).send({ message: 'OK' });
};

const saveStringsToFile = async (language, strings, ID) => {
	const filePath = `${__dirname}/../../../../components/translate/data/${language}/strings.json`;
	const fileContent = getFileContent(language);
	const filesJson = JSON.parse(fileContent);
	const json = JSON.parse(strings);
	const newJson = { ...filesJson, ...json };
	const jsonStr = JSON.stringify(newJson);

	fs.writeFile(filePath, jsonStr, err => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(`File ${filePath} saved`);
	});
	await query(`DELETE FROM translations WHERE id = ${ID}`);
};

const getFileContent = language => {
	const filePath = `${__dirname}/../../../../components/translate/data/${language}/strings.json`;
	return fs.readFileSync(filePath, 'utf8');
};

export default handler;
