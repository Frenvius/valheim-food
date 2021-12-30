import { query } from 'helpers/db';

const handler = async (req, res) => {
	try {
		const results = await query(`SELECT * FROM languages`);
		return res.status(200).send(results);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

export default handler;
