const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const mysql = require('mysql');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	createServer((req, res) => {
		const parsedUrl = parse(req.url, true);
		const { pathname, query } = parsedUrl;

		if (pathname === '/api/saveTranslate') {
			if (req.method === 'POST') {
				console.log('body', req.json);
				res.status(400).send({ message: 'Only POST requests allowed' })
				return
			}
		} else {
			handle(req, res, parsedUrl);
		}
	}).listen(3000, err => {
		if (err) throw err;
		console.log('> Ready on http://localhost:3000');
	});
});
