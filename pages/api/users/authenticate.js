const jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt';

import { apiHandler } from 'helpers/api';
import { query } from 'helpers/db';

const handler = (req, res) => {
    const authenticate = async () => {
        const { email, password } = req.body;

        const result = await query(`SELECT * FROM users WHERE email LIKE '${email}'`);
        if (!result[0]) {
            console.log(`SELECT * FROM users WHERE email LIKE '${email}'`);
            return res.status(400).send({ error: 'User not found' });
        }
        const user = JSON.parse(JSON.stringify(result[0]));

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw 'Username or password is incorrect';

        const token = jwt.sign({ sub: user.id }, process.env.SECRET, {
            expiresIn: '7d'
        });

        return res.status(200).json({
            id: user.id,
            username: user.name,
            email: user.email,
            token
        });
    };

    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default apiHandler(handler);
