/*********************************************************
 ◘ filename: User.route.js 
 ◘ Description:
    User router code for OddJobber App's backend api
 *********************************************************/
const express = require('express');
const router = express.Router();
const { 
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
} = require('../controllers/User.controller');
 
const authenticate = require('../middleware/authenticate');

// csrf related
const csrfProtection = require('../middleware/csrfProtection');
const resetCsrfToken = require('../middleware/resetCsrfToken');
const setupGetUserId = require('../middleware/setupGetUserId');

const Tokens = require('../utilities/updatedCsrfModule');
const tokens = new Tokens();

// Allows reloading of user data after closing browser or refreshing the page
router.route('/authenticate').post(authenticate, resetCsrfToken, csrfProtection, setupGetUserId, getUser);

// GET all users
router.route('/all').get(authenticate, csrfProtection, getAllUsers);

// GET user
router.route('/id/:id').get(authenticate, csrfProtection, getUser);

// CREATE user
router.route('/signup').post(createUser);

// LOGIN user
router.route('/login').post(loginUser);

// LOGOUT user
router.route('/logout').post(authenticate, csrfProtection, logoutUser);

// UPDATE user attributes
router.route('/update/attributes').patch(authenticate, csrfProtection, updateUserAttributes);

// UPDATE user's username
router.route('/update/username').post(authenticate, csrfProtection, updateUsername); 

// UPDATE user password
router.route('/update/password').post(authenticate, csrfProtection, updateUserPassword);

// UPDATE add user skill
router.route('/update/skill/add').patch(authenticate, csrfProtection, addSkill); 

// UPDATE remove user skill
router.route('/update/skill/remove').patch(authenticate, csrfProtection, removeSkill); 

// UPDATE user rating
router.route('/update/rating').patch(authenticate, csrfProtection, rateUser);

// UPDATE user hourly wage
router.route('/update/hourly-rate').post(authenticate, csrfProtection, updateHourlyRate);

// DELETE user
router.route('/delete').delete(authenticate, csrfProtection, deleteUser);

module.exports = router;
