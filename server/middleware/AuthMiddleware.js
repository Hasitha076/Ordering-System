const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        secretKey,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.email = decoded.email
            next()
        }
    )
};

module.exports = verifyToken;
