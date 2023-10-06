/*********************************************************
 ◘ filename: Skill.route.js 
 ◘ Description:
    Skill router code for OddJobber App's backend api
 *********************************************************/
const express = require('express');
const router = express.Router();

const { 
    getSkills,
    getSkillByName,
    createSkill,
    validateSkillNotInUse,
    updateSkill,
    deleteSkill
 } = require('../controllers/Skill.controller');

const authenticate = require('../middleware/authenticate');
const csrfProtection = require('../middleware/csrfProtection');

// GET all skills
router.route('/all').get(getSkills);

// GET one skill
router.route('/name/:name').get(getSkillByName);

// CREATE one skill
router.route('/create').post(authenticate, csrfProtection, createSkill);

// UPDATE one skill
router.route('/update').patch(authenticate, csrfProtection, validateSkillNotInUse, updateSkill);

// DELETE one skill
router.route('/delete').delete(authenticate, csrfProtection, validateSkillNotInUse, deleteSkill);

module.exports = router;