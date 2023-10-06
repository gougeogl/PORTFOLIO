/***********************************************************
 ◘ filename: User.controller.js 
 ◘ Description:
    Library of controller functions used as callbacks to
    various routes used when querying for 'User' data
    in the OddJobber App backend api.
 ***********************************************************/

// Mongoose Models
const User = require('../models/User.model');
const Skill = require('../models/Skill.model');
const Project = require('../models/Project.model');

// VALIDATORS & CUSTOM ERROR CLASSES
const isMongoId = require('mongoose').isValidObjectId;
const {
    CustomError,
    BadRequest,
    NotFound,
    InputValidationError
} = require('../errors/Error.custom.class');
const Tokens = require('../utilities/updatedCsrfModule');
const tokens = new Tokens();

// GETs all users
const getAllUsers = async(req, res, next) => {
    try {
        const users = await User.find({}, '-password').populate('skills').lean();
        if(!users){
            NotFound.throw('no users found'); 
        }

        res.locals = users;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// GET one user
const getUser = async(req, res, next) => {
    try {
        const { id } = req.params;

        if(!isMongoId(id)){
            InputValidationError.throw('id');
        } 

        const user = await User.findById({_id: id}, '-password').populate('skills').lean();
        if(!user){
            NotFound.throw('user not found');
        }

        /**************************************
         ◘ Description:
           A new CSRF token is generated when:
            • a page refreshes
            • a user session is still valid, but
              the user closed the browser

            * the new token MUST be set on the
              returned user, otherwise the
              front-end state will see it as
              a potential csrf attack
         **************************************/
        if(req.res.locals.csrf){
            user.csrfToken = req.res.locals.csrf;
        }

        res.locals = user;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
};

// CREATE user
const createUser = async(req, res, next) => {
    try {
        const { 
            username,
            password,
            firstName,
            lastName,
            picture,
            email,
            cell,
            street,
            city,
            state,
            zipcode
        } = req.body;
        
        // CREATE user
        const user = await User.create({
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "picture": picture,
            "email": email,
            "cell": cell,
            "street": street,
            "city": city,
            "state": state,
            "zipcode": zipcode
        });

        if(!user){
            BadRequest.throw('user not created');
        }

        const newUser = await User.findById({_id: user._id}, '-password').populate('skills').lean();
        if(!newUser){
            NotFound.throw('user creation failed!');
        }

        req.session.user = user._id;
        req.session.secret = tokens.secretSync();

        // CSRF token
        newUser.csrfToken = tokens.create(req.session.secret);
        
        res.locals = newUser;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
};

// LOGIN
const loginUser = async(req, res, next) => {
    try {
        const { username, password } = req.body;

        if(!username){
            InputValidationError.throw('username');
        }

        if(!password){
            InputValidationError.throw('password');
        }

        const user = await User.findOne({ "username": username });
        if(!user){
            NotFound.throw('user not found');
        }

        if(!(await user.matchPassword(password))){
            CustomError.throw('Invalid password');
        }
        
        const loggedUser = await User.findById({_id: user._id}, '-password').populate('skills').lean();
        if(!loggedUser){
            CustomError.throw('login failed');
        }

        req.session.user = user._id;
        req.session.secret = tokens.secretSync();

        // CSRF token
        loggedUser.csrfToken = tokens.create(req.session.secret);

        res.locals = loggedUser;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

const logoutUser = async(req, res, next) => {
    try {
        req.session.destroy();
        res.status(200).json({}); 
    } catch(error) {
        next(error);
    }
}

// UPDATE user attributes
const updateUserAttributes = async(req, res, next) => {
    try {
        const {
            id,
            firstName,
            lastName,
            picture,
            email,
            cell,
            street,
            city,
            state,
            zipcode
        } = req.body;

        if(!isMongoId(id)){
            InputValidationError.throw('id');
        } 

        const user = await User.findOne({_id: id});
        if(!user){
            NotFound.throw('user not found');
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.picture = picture;
        user.email = email;
        user.cell = cell;
        user.street = street;
        user.city = city;
        user.state = state;
        user.zipcode = zipcode;
        await user.save();

        const userUpdate = await User.findById({_id: user._id}, '-password').populate('skills').lean();
        if(!userUpdate){
            CustomError.throw('user not found after update');
        }

        // new secret
        req.session.secret = tokens.secretSync();

        // new token
        userUpdate.csrfToken = tokens.create(req.session.secret);

        res.locals = userUpdate;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// UPDATE user's username
const updateUsername = async(req, res, next) => {
    try {
        const { 
            old_username,
            password,
            new_username 
        } = req.body;

        if(!old_username){
            InputValidationError.throw('old username');
        }
        
        if(!password){
            InputValidationError.throw('password');
        }

        if(!new_username){
            InputValidationError.throw('new username');
        }

        const user = await User.findOne({ username: old_username });
        if(!user){
            NotFound.throw('user not found');
        }

        if(!(await user.matchPassword(password))){
            CustomError.throw('Invalid password');
        }

        if(old_username === new_username){
            CustomError.throw('you cannot use the same username as before');
        }

        user.username = new_username;
        await user.save();

        const userUpdate = await User.findById({_id: user._id}, '-password').populate('skills').lean();
        if(!userUpdate){
            CustomError.throw('user not found after update');
        }

        // new secret
        req.session.secret = tokens.secretSync();
        
        // new token
        userUpdate.csrfToken = tokens.create(req.session.secret);

        res.locals = userUpdate;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// UPDATE user password
const updateUserPassword = async(req, res, next) => {
    try {
        const { 
            username,
            old_password,
            new_password 
        } = req.body;

        if(!username){
            InputValidationError.throw('username');
        }

        const user = await User.findOne({ username: username });
        if(!user){
            NotFound.throw('user not found');
        }

        if(!old_password){
            InputValidationError.throw('old password');
        }
        
        if(!new_password){
            InputValidationError.throw('new password');
        }

        if(!(await user.matchPassword(old_password))){
            CustomError.throw('old password was invalid');
        }

        if(old_password === new_password){
            CustomError.throw('you cannot use the same password as before');
        }

        user.password = new_password;
        await user.save();

        const userUpdate = await User.findById({_id: user._id}, '-password').populate('skills').lean();
        if(!userUpdate){
            CustomError.throw('user not found after update');
        }

        // new secret
        req.session.secret = tokens.secretSync();
        
        // new token
        userUpdate.csrfToken = tokens.create(req.session.secret);

        res.locals = userUpdate;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// UPDATE add skill
const addSkill = async(req, res, next) => {
    try {
        const { user_id, skill_id } = req.body;

        if(!isMongoId(user_id)){
            InputValidationError.throw('user id');
        }

        if(!isMongoId(skill_id)){
            InputValidationError.throw('skill id');
        }

        const skill = await Skill.findById({ _id: skill_id });
        if(!skill){
            NotFound.throw('skill not found');
        }

        const user = await User.findById({ _id: user_id });
        if(!user){
            NotFound.throw('user not found');
        }

        if(await user.findSkillById(skill._id)){
            CustomError.throw(`${user.firstName} ${user.lastName} already has that skill`);
        }

        user.skills.push(skill._id);
        await user.save();

        const userUpdate = await User.findById({_id: user._id}, '-password').populate('skills').lean();
        if(!userUpdate){
            CustomError.throw('user not found after update');
        }

        // new secret
        req.session.secret = tokens.secretSync();
        
        // new token
        userUpdate.csrfToken = tokens.create(req.session.secret);

        res.locals = userUpdate;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// UPDATE remove user skill
const removeSkill = async(req, res, next) => {
    try {
        const { user_id, skill_id } = req.body;

        if(!isMongoId(user_id)){
            InputValidationError.throw('user id');
        }

        if(!isMongoId(skill_id)){
            InputValidationError.throw('skill id');
        }

        const skill = await Skill.findById({ _id: skill_id });
        if(!skill){
            NotFound.throw('skill not found');
        }

        const user = await User.findById({ _id: user_id });
        if(!user){
            NotFound.throw('user not found');
        }

        await user.skills.pull(skill_id);
        await user.save();

        const userUpdate = await User.findById({_id: user._id}, '-password').populate('skills').lean();
        if(!userUpdate){
            CustomError.throw('user not found after update');
        }

        // new secret
        req.session.secret = tokens.secretSync();
        
        // new token
        userUpdate.csrfToken = tokens.create(req.session.secret);

        res.locals = userUpdate;
        res.status(200).json(res.locals);
    } catch(error) {
        next(error);
    }
}

// UPDATE user rating
const rateUser = async(req, res, next) => {
    try {
        const { 
            id, 
            rating
        } = req.body;
        
        const user = await User.findById({ _id: id });
        if(!user){
            NotFound.throw('user not found');
        }

        if(!rating){
            InputValidationError.throw('rating');
        }

        user.rating = rating;
        await user.save();

        const updatedUser = await User.findById({_id: id}, '-password').populate('skills').lean();
        if(!updatedUser){
            CustomError.throw('user not found after update');
        }

        res.locals = updatedUser;
        res.status(200).json(res.locals);

    } catch(error){
        next(error);
    }
}

// UPDATE user hourly wage
const updateHourlyRate = async(req, res, next) => {
    try {
        const { 
            username, 
            password,
            hourly_rate 
        } = req.body;

        if(!username){
            InputValidationError.throw('username');
        }

        if(!password){
            InputValidationError.throw('password');
        }

        if(!hourly_rate){
            InputValidationError.throw('hourly rate');
        }

        const user = await User.findOne({ username: username });
        if(!user){
            NotFound.throw('user not found');
        }

        if(!(await user.matchPassword(password))){
            CustomError.throw('Invalid password');
        }

        user.hourly_rate = hourly_rate;
        await user.save();

        const updatedUser = await User.findById({_id: user._id}, '-password').populate('skills').lean();
        if(!updatedUser){
            CustomError.throw('user not found after update');
        }

        // new secret
        req.session.secret = tokens.secretSync();

        // new token
        updatedUser.csrfToken = tokens.create(req.session.secret);

        res.locals = updatedUser;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error)
    }
}

// DELETE user
const deleteUser = async(req, res, next) => {
    try {
        const { username, password } = req.body;
        
        if(!username){
            InputValidationError.throw('username');
        }

        if(!password){
            InputValidationError.throw('password');
        }

        const user = await User.findOne({ username: username });
        if(!user){
            NotFound.throw('user not found');
        }

        if(!(await user.matchPassword(password))){
            CustomError.throw('Invalid password');
        }

        const projects = await Project.find().where('contact').equals(user._id);
        if(projects){
            projects.map(async(project) => {
                const deletedProject = await Project.findOneAndDelete({ _id: project._id });
                if(!deletedProject){
                    BadRequest.throw('project was not deleted');
                }

            });
        }

        const deletedUser = await User.findOneAndDelete({ _id: user._id });
        if(!deletedUser){
            BadRequest.throw('User deletion failed');
        }

        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

module.exports = { 
    getAllUsers,
    getUser,
    createUser,
    loginUser,
    logoutUser,
    updateUsername,
    updateUserPassword,
    updateUserAttributes,
    addSkill,
    removeSkill,
    rateUser,
    updateHourlyRate,
    deleteUser,
};
