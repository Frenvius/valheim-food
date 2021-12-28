const handler = (req, res) => {
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' });
		return;
	}

	if (!req.body.password) {
		res.status(400).send({ message: 'Username and password required' });
		return;
	}

	if (req.body.password === process.env.ADMIN_PASS) {
		res.status(200).send();
		return;
	} else {
		res.status(403).send();
		return;
	}
}

export default handler;