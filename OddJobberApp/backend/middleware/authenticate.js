/*********************************************************************
 ◘ Filename: authenticate.js
 ◘ Description: 
    Authentication middleware for Express JS. Pass to callback string
    of a route to check for express-session expiration. This function
    is critical to the security of api routes from unauthorized 
    access.
 *********************************************************************/

// Custom Error Classes
const { AuthenticationError } = require('../errors/Error.custom.class');

const authenticate = async(req, res, next) => {
    try {
        if(!req.session.user){
            AuthenticationError.throw();
        }
        next();
    } catch(error) {
        next(error);
    }
}

module.exports = authenticate;
