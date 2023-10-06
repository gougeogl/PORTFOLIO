/*********************************************************************
 ◘ filename: Error.handler.js
 ◘ Description:
    Primary error handler for the OddJobber App backend api. 
    The handler is used in primary backend api server at the end of
    all routes. Handles custom errors and Mongoose generated validator
    errors. 'getErrorsFromObject()' parses the Mongoose errors.

 ◘ Dependencies:
    Custom Javascript error classes from file: Error.custom.class 
 *********************************************************************/

// Custom Error Classes
const {
    CustomError,
    BadRequest,
    NotFound,
    InputValidationError,
    AuthenticationError,
    CSRFError
} = require('./Error.custom.class');

// update these to increase the types of mongo errors to check by err.name
const MONGO_ERRORS = ['CastError', 'RangeError', 'ValidationError'];

function isMongoError(list, value){
    for(let err of list){
        if(err === value){
            return true;
        }
    }
    return false;
}

// returns an array of errors from ValidationError object
function getErrorsFromObject(errObject){
    let validationErrors = [];
    for(let problem in errObject.errors){
        validationErrors.push({
            'error-type': errObject.name,
            input: `${problem}`,
            problem: `${errObject.errors[problem]}`
        });
    }
    return validationErrors;
}

// PRIMARY ERROR HANDLING FUNCTION 
const errorHandler = async(err, req, res, next) => {

    if(err instanceof BadRequest){
        res.status(err.code).json({
            errors: [{
                'error-type': err.name,
                reason: err.message
            }]
        });
        return;
    }

    if(err instanceof NotFound){
        res.status(err.code).json({
            errors: [{
                'error-type': err.name,
                reason: err.message
            }]
        });
        return;
    }

    if(err instanceof InputValidationError){
        res.status(err.code).json({
            errors: [{
                'error-type': err.name,
                reason: err.message
            }]
        });
        return;
    }

    if(err instanceof AuthenticationError){
        res.status(err.code).json({
            errors: [{
                authentication: err.message
            }]  
        });
        return;
    }

    if(err instanceof CSRFError){
        res.status(err.code).json({
            errors: [{
                authentication: err.message
            }]  
        });
        return;
    }

    if(err instanceof CustomError){
        res.status(err.code).json({
            errors: [{
                'error-type': err.name,
                problem: err.message
            }]
        });
        return;
    }

    if(isMongoError(MONGO_ERRORS, err.name)){
        const errorArray = getErrorsFromObject(err);
        res.status(400).json({
            errors: errorArray 
        });
        return;
    }

    // SyntaxError
    if(err.name === 'SyntaxError'){
        res.status(400).json({
            errors: [{
                'error-type': err.name,
                explanation: 'check for improper use of brackets, commas, etc.'
            }]
        });
        return;
    }

    // TypeError
    if(err.name === 'TypeError'){
        res.status(400).json({
            errors: [{
                'error-type': err.name,
                explanation: 'The input parameter was of the wrong type, or was missing'
            }]
        });
        return;
    }

    // all other errors (server error)
    let payload = {};
    payload.error = err.name;
    payload.reason = err.message;
    process.env.NODE_ENV === 'development' ? payload.stack = err.stack : null;
    res.status(500).json(payload);
}

module.exports = errorHandler;
