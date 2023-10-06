/***********************************************************
 ◘ filename: Skill.controller.js 
 ◘ Description:
    Library of controller functions used as callbacks to
    various routes used when querying for 'Skill' data
    in the OddJobber App backend api.
 ***********************************************************/

// Mongoose Models
const Skill = require('../models/Skill.model');
const User = require('../models/User.model');
const Project = require('../models/Project.model');

// CUSTOM VALIDATORS & ERROR CLASSES
const isMongoId = require('mongoose').isValidObjectId;
const { 
    BadRequest, 
    NotFound, 
    InputValidationError, 
    CustomError 
} = require('../errors/Error.custom.class');

// GET all skills
const getSkills = async(req, res, next) => {
    try {
        const skills = await Skill.find();
        if(!skills){
            NotFound.throw('no skills were found');
        }

        res.locals = skills;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// GET one skill
const getSkillByName = async(req, res, next) => {
    try {
        const { name } = req.params;

        if(!name){
            InputValidationError.throw('name');
        }

        const skill = await Skill.findOne({ name: name });
        if(!skill){
            NotFound.throw('skill not found');
        }

        res.locals = skill;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// CREATE one skill
const createSkill = async(req, res, next) => {
    try {
        const { name, description, picture, level } = req.body;
        if(!name){
            InputValidationError.throw('name');
        }
        if(!description){
            InputValidationError.throw('description');
        }
        if(!level){
            InputValidationError.throw('experience level');
        }

        const skill = await Skill.create({
            "name": name,
            "description": description,
            "picture": picture,
            "level": level
        });

        if(!skill){
            BadRequest.throw('skill creation failed');
        }

        res.locals = skill;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

/* ***************************************************************
    * VALIDATION ONLY (internal to this file)
    * Description:
        Prevents updating or deleting skills based upon
        desired behaviors. Attempts to update / delete will
        trigger errors.

    * Desired Behaviors:
        Skills should only be manipulated if they are:
            1. Not in use by any user
            2. Not in use by any project

******************************************************************/
const validateSkillNotInUse = async(req, res, next) => {
    try {
        const { id } = req.body;

        // Users / Workers ***************************************
        const users = await User.find().populate('skills').lean();

        // get any user with skills
        let usersWithSkills = users.filter(user => user.skills.length > 0 );
        let matchedUserSkills = await getSkillMatches(usersWithSkills, id);

        if(matchedUserSkills && matchedUserSkills.length > 0){
            CustomError.throw('you cannot edit or delete a skill in use by someone else');
        }

        // Projects ***************************************************
        const projects = await Project.find().populate('skills').lean();

        // get any project requiring skills
        let projectsWithSkills = projects.filter(project => project.skills.length > 0 );
        let matchedProjectSkills = await getSkillMatches(projectsWithSkills, id);

        if(matchedProjectSkills && matchedProjectSkills.length > 0){
            CustomError.throw('skills used as project requirements cannot be altered or deleted')
        }
        next();

    } catch(error){
        next(error);
    }
}

// UPDATE one skill
const updateSkill = async(req, res, next) => {
    try {
        const { id, name, description, picture, level } = req.body;
        if(!id){
            InputValidationError.throw('id')
        }
        if(!isMongoId(id)){
            InputValidationError.throw('id')
        }
        if(!name){
            InputValidationError.throw('name');
        }
        if(!description){
            InputValidationError.throw('description');
        }
        if(!level){
            InputValidationError.throw('experience level');
        }

        const skill = await Skill.findById({ _id: id });
        if(!skill){
            NotFound.throw('skill not found');
        }

        skill.name = name;
        skill.description = description;
        skill.picture = picture;
        skill.level = level;
        await skill.save();

        res.locals = skill;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// DELETE one skill
const deleteSkill = async(req, res, next) => {
    try {
        const { id } = req.body;
        if(!id || !isMongoId(id)){
            InputValidationError.throw('id');
        }
        
        // Now delete the skill
        const deletedSkill = await Skill.findOneAndDelete({ _id: id });
        if(!deletedSkill){
            BadRequest.throw('skill not deleted');
        }

        res.locals = deletedSkill;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// Utility function
const getSkillMatches = async(entityWithSkills, skill_id) => {
    let matches = [];
    for(const entity of entityWithSkills){
        entity.skills.map((skill) => { 
            if(skill._id.equals(skill_id)){
                matches.push(skill._id);
            } 
        });
    }
    return matches;
}

module.exports = { 
    getSkills,
    getSkillByName,
    validateSkillNotInUse,
    createSkill,
    updateSkill,
    deleteSkill
};