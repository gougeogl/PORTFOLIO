/****************************************************************
 ◘ filename: app.js 
 ◘ Description: 
    Backend api server for OddJobber App. Forms the backend
    tier of the MERN stack.

 ◘ Key Dependencies:
    MongoDB database connection: db.connect.js
    An appropriate file for environment secrets
 ****************************************************************/
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); 
const connect = require('./db.connect');
connect();

const store =  new MongoDBStore(
  {
    uri: process.env.MONGO_URI,
    databaseName: process.env.DB
  },
  function(error){
    if(error){
      throw new Error('MongoDB session store error');
    }
  }
);

store.on('error', function(error){
  throw new Error('MongoDB session store error');
});

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('trust proxy', 1);
app.use(
  session({
    secret: process.env.SESSION,
    cookie: { 
      domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : null,
      httpOnly: true, // disallows client side JS to access
      sameSite: true, // cookie must be issued from same site
      secure: process.env.NODE_ENV === 'production' ? true : false, // set true when https is being used as the scheme
      maxAge: parseInt(process.env.SESSION_MAX_AGE) 
    },
    resave: false,
    proxy: true,
    saveUninitialized: false,
    store: store
  })
);

const path = require('path');

// Header protection
const helmet = require('helmet');
app.use(helmet());

// NoSQL injection protection
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());

const errorHandler = require('./errors/Error.handler');

// ROUTES
const users = require('./routes/User.route');
app.use('/api/user/', users);

const projects = require('./routes/Project.route');
app.use('/api/project/', projects);

const skills = require('./routes/Skill.route');
app.use('/api/skill/', skills);

// PRIMARY ERROR HANDLER
app.use(errorHandler);

// Production Only
if(process.env.NODE_ENV === 'production'){
  const productionPath = '../frontend/build';
  app.use(express.static(productionPath));
  app.use("/*", async (req, res, next) => {
	res.sendFile(path.resolve(__dirname, productionPath, 'index.html'));
  });
}

// you have to export this in order for ./bin/www file to access it
module.exports = app;
