const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.MY_BLOG_SECRET;

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    console.log(`Token: ${token}`);
    if(!token) {
        next({status: 403, message: 'No access token provided.'});
    } else {
        jwt.verify(token, secret,  function(error, decoded) {
            if(error) {
                next({status: 403, message: 'Failed to authenticate token.', error});
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}

module.exports = verifyToken;