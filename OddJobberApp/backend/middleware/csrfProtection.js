/********************************************************
 ◘ Cross-Site-Request-Forgery (CSRF) Protection
 ◘ Description:

    Validates csrf tokens that are sent to the api by
    comparing the token value to the user's current
    session.secret value. 
  
    • Get requests from frontend
    React hooks set a custom header named 'csrf-token' 
    with the user's token. or a value on the body as
    'csrf', or a value on the locals object of 'csrf'.

    • Forms set the Token in the form body.
    
 ********************************************************/ 
const { CSRFError } = require('../errors/Error.custom.class');
const Tokens = require('../utilities/updatedCsrfModule');
const options = {
    value: function(req){      
        let token = (req.body && req.body.csrf) ||
        (req.query && req.query.csrf) ||
        (req.res.locals.csrf) ||
        (req.headers['csrf-token']);
        req.csrf = token;
    }
}
const tokens = new Tokens(options);

const csrfProtection = async(req, res, next) => {
    try {
        tokens.value(req);
        if(!tokens.verify(req.session.secret, req.csrf)){
            CSRFError.throw();
        }
        next();
    } catch(error){
        next(error);
    }
}

module.exports = csrfProtection;
  
 