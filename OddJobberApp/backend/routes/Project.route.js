/*********************************************************
 ◘ filename: Project.route.js 
 ◘ Description:
    Project router code for OddJobber App's backend api
 *********************************************************/
const express = require('express');
const router = express.Router();

const { 
    getProjects,
    getProjectById,
    createProject,
    updateProjectSpecs,
    addWorker,
    removeWorker,
    addSkill,
    removeSkill,
    deleteProject
 } = require('../controllers/Project.controller');

const authenticate = require('../middleware/authenticate');
const csrfProtection = require('../middleware/csrfProtection');

const Tokens = require('../utilities/updatedCsrfModule');
const tokens = new Tokens();

// GET all projects
router.route('/all').get(authenticate, csrfProtection, getProjects);

// GET one project
router.route('/id/:id').get(authenticate, csrfProtection, getProjectById);

// CREATE one project
router.route('/create').post(authenticate, csrfProtection, createProject);

// UPDATE one project
router.route('/update').patch(authenticate, csrfProtection, updateProjectSpecs); 

// UPDATE add worker
router.route('/add-worker').patch(authenticate, csrfProtection, addWorker); 

// UPDATE remove worker
router.route('/remove-worker').patch(authenticate, csrfProtection, removeWorker); 

// UPDATE add skill
router.route('/add-skill').patch(authenticate, csrfProtection, addSkill); 

// UPDATE remove skill
router.route('/remove-skill').patch(authenticate, csrfProtection, removeSkill); 

// DELETE project
router.route('/delete').delete(authenticate, csrfProtection, deleteProject);

module.exports = router;