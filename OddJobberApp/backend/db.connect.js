/****************************************************************
 ◘ filename: db.connect.js 
 ◘ Description: 
    Primary connection to MongoDB database

 ◘ Key Dependencies:
    An appropriate file for environment secrets (e.g., .env)
 ****************************************************************/
const mongoose = require('mongoose');

const result = require('dotenv').config()
if(result.error && process.env.NODE_ENV === 'development'){
    throw result.error;
}

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to db');
    } catch(error) {
        throw new Error('could not connect to the db');
    }
}

module.exports = connect;
