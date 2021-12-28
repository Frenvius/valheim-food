const mysql = require('mysql');

const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
	database: process.env.MYSQL_NAME,
	charset: 'utf8mb4_unicode_ci'
});

const handler = (req, res) => {
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' });
		return;
	}

	saveNewTranslate(req.body.language, JSON.stringify(req.body.data))
	res.status(200).send({ message: 'OK' });
}

const saveNewTranslate = (language, json) => {
	connection.connect();

	connection.query(
		`INSERT INTO translations (language, json) VALUES ('${language}', ${connection.escape(json)})`,
		(err, result) => {
			if (err) {
				console.log(err);
			}
		}
	);
};

export default handler;