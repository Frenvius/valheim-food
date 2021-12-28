import { query } from '../../../lib/db';

const handler = async (req, res) => {
	try {
		const results = await query(`SELECT * FROM translations`);
		return res.status(200).send(results);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

export default handler;
