const jsonToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
        console.log("checking admin auth")
        const decodedToken = jsonToken.verify(token, 'secret_admin_token');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};