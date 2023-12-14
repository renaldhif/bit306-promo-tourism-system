import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Extracts the token from the "Bearer <token>" format

        if (!token) {
            return res.status(401).send({ message: 'Access denied, no token provided.' });
        }

        // Verifies the token using the JWT_SECRET
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send({ message: 'Invalid or expired token.' });
            }

            req.user = user; // Add the user payload to the request object
            next(); // Proceed to the next middleware or route handler
        });
    } catch (error) {
        res.status(500).send({ message: 'An error occurred while processing the token.' });
    }
};
