/*************************************************
 ◘ filename: Error.custom.class.js
 ◘ Description:
    Library of custom Javascript error classes 
    used in the OddJobber App. These errors
    can be imported and thrown inside the
    controller functions used in the backend
    api code e.g., when a MongoDB data request
    fails. The error types have self-documenting
    names.
 *************************************************/

class CustomError {
    constructor(message, code = 400){
        this.name = this.constructor.name;
        this.message = message;
        this.code = code;
    }

    static throw(message, code){
        throw new CustomError(message, code);
    }
}

class BadRequest extends CustomError {
    constructor(message){
        super(message);
        this.name = this.constructor.name;
    }

    static throw(message){
        throw new BadRequest(message);
    }
}

class NotFound extends CustomError {
    constructor(message){
        super(message);
        this.name = this.constructor.name;
    }

    static throw(message){
        throw new NotFound(message);
    }
}

// Mongoose Error Objects : kind, path, value, message
class InputValidationError extends CustomError {
    constructor(path){
        super(`missing ${path}, or invalid format`);
        this.name = this.constructor.name;
    }

    static throw(path){
        throw new InputValidationError(path);
    }
}

class AuthenticationError extends CustomError {
    constructor(){
        super('access denied', 403);
        this.name = this.constructor.name;
    }

    static throw(){
        throw new AuthenticationError();
    }
}

class CSRFError extends CustomError {
    constructor(){
        super(`access denied : potential CSRF attack detected`, 403);
        this.name = this.constructor.name;
    }

    static throw(){
        throw new CSRFError();
    }
}

module.exports = {
    CustomError,
    BadRequest,
    NotFound,
    InputValidationError,
    AuthenticationError,
    CSRFError,
}