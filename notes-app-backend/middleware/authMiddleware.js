// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Get token from header
    const token = req.header('Authorization');

    // 2. Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // The token is in the format "Bearer <token>", so we need to extract it
    const actualToken = token.split(' ')[1];
    if (!actualToken) {
        return res.status(401).json({ msg: 'Token format is invalid, authorization denied' });
    }

    // 3. Verify token
    try {
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        // Add the user payload from the token to the request object
        req.user = decoded.user;
        next(); // Move on to the next piece of middleware or the route handler
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};