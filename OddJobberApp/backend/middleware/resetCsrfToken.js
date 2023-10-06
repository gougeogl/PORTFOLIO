/**************************************************************************
 ◘ Filename: resetCsrfToken.js
 ◘ Description: 
    CSRF protection middleware for the OddJobber App backend api.
    A user's data must be sent to the client beside normal login or
    signup proceedures during..
    1. page refresh
    2. the user leaves and returns to the app (user closed the browser tab)

    The resetCsrfToken middleware will generate a new secret for the user
    and set a new token to be used in their front-end user state
 ***************************************************************************/
const Tokens = require('../utilities/updatedCsrfModule');
const tokens = new Tokens();

const resetCsrfToken = async(req, res, next) => {
    try{
        const token = tokens.create(req.session.secret);
        res.locals.csrf = token;
        next();
    } catch(error){
        next(error);
    }
}

module.exports = resetCsrfToken;