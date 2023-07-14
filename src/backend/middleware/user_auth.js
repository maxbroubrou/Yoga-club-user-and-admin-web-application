const jsonToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
        console.log("checking user auth")
        //check user or admin token is valid
        let decodedToken = null;
        try {
            decodedToken = jsonToken.verify(token, 'secret_user_token');
        } catch {
            // console.log("not user")
        }
        if (decodedToken == null) {
            try {
                decodedToken = jsonToken.verify(token, 'secret_admin_token');
            } catch {
                // console.log("not admin")
            }
        }
        
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