const expressJwt = require('express-jwt');
const util = require('util');

const jwtMiddleware = (req, res) => {
	const middleware = expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }).unless({
		path: ['/api/users/authenticate']
	});

	return util.promisify(middleware)(req, res);
};

export { jwtMiddleware };
