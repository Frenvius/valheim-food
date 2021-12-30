import { query } from 'helpers/db';

const handler = async (req, res) => {
	try {
		const { language } = req.query;
		const results = await query(`SELECT COUNT(*) as count FROM translations WHERE language = '${language}'`);
		return res.status(200).send(results[0]);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

export default handler;
