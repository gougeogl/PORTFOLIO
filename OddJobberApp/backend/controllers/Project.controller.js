/***********************************************************
 ◘ filename: Project.controller.js 
 ◘ Description:
    Library of controller functions used as callbacks to
    various routes used when querying for 'Project' data
    in the OddJobber App backend api.
 ***********************************************************/

// Mongoose Models
const Project = require('../models/Project.model');
const User = require('../models/User.model');
const Skill = require('../models/Skill.model');

// Custom Error Classes
const isMongoId = require('mongoose').isValidObjectId;
const { 
    BadRequest, 
    NotFound, 
    InputValidationError,
    CustomError 
} = require('../errors/Error.custom.class');


// GET all projects
const getProjects = async(req, res, next) => {
    try {
        const projects = await Project.find().populate([
            { 
                path: 'contact', 
                select: 'firstName lastName picture'
            }, 
            { 
                path: 'workers', 
                populate: {
                    path: 'skills',
                    select: '_id name level description'
                },
                select: 'firstName lastName picture email cell street city state zipcode rating hourly_rate'
            },
            { 
                path: 'skills', 
                select: '_id name level description'
            }
        ]).lean();

                                        
        if(!projects){
            NotFound.throw('no projects found');
        }

        res.locals = projects;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// GET one project
const getProjectById = async(req, res, next) => {
    try {
        const { id } = req.params;
        if(!id || !isMongoId(id)){
            InputValidationError.throw('id');
        }

        const project = await Project.findById({ _id: id }).populate([
            { 
                path: 'contact', 
                select: 'firstName lastName picture'
            }, 
            { 
                path: 'workers', 
                populate: {
                    path: 'skills',
                    select: '_id name level description'
                },
                select: 'firstName lastName picture email cell street city state zipcode rating hourly_rate'
            },
            { 
                path: 'skills', 
                select: '_id name level description'
            }
        ]).lean();

        if(!project){
            NotFound.throw('project not found');
        }

        res.locals = project;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// CREATE one project
const createProject = async(req, res, next) => {
    try {
        const {
            contact_id,
            description,
            deadline,
        } = req.body;

        if(!contact_id || !isMongoId(contact_id)){
            InputValidationError.throw('contact id');
        }
        if(!description){
            InputValidationError.throw('project description');
        }
        if(!deadline){
            InputValidationError.throw('project deadline');
        }

        const contact = await User.findById({ _id: contact_id });
        if(!contact){
            NotFound.throw('project contact does not exist');
        }

        const project = await Project.create({
            "contact": contact._id,
            "description": description,
            "deadline": deadline,
            "status": "not started"
        });

        if(!project){
            BadRequest.throw('project creation failed');
        }

        res.locals = project;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// UPDATE project specs
const updateProjectSpecs = async(req, res, next) => {
    try {
        const {
            project_id,
            contact_id,
            description,
            deadline,
            status,
        } = req.body;

        if(!project_id || !isMongoId(project_id)){
            InputValidationError.throw('project id');
        }
        if(!contact_id || !isMongoId(contact_id)){
            InputValidationError.throw('contact id');
        }
        if(!description){
            InputValidationError.throw('project description');
        }
        if(!deadline){
            InputValidationError.throw('project deadline');
        }
        if(!status){
            InputValidationError.throw('status');
        }

        const contact = await User.findById({ _id: contact_id });
        if(!contact){
            NotFound.throw('project contact does not exist');
        }

        const project = await Project.findById({ _id: project_id });
        if(!project){
            NotFound.throw('project not found');
        }

        project.contact = contact._id;
        project.description = description;
        project.deadline = deadline;
        project.status = status;
        await project.save();

        const updatedProject = await Project.findById({ _id: project_id }).populate([
            { 
                path: 'contact', 
                select: 'firstName lastName picture'
            }, 
            { 
                path: 'workers', 
                populate: {
                    path: 'skills',
                    select: '_id name level description'
                },
                select: 'firstName lastName picture email cell street city state zipcode rating hourly_rate'
            },
            { 
                path: 'skills', 
                select: '_id name level description'
            }
        ]).lean();

        if(!updatedProject){
            NotFound.throw('project not found');
        }

        res.locals = updatedProject;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// UPDATE add one worker
const addWorker = async(req, res, next) => {
    try {
        const { project_id, worker_id } = req.body;

        if(!project_id || !isMongoId(project_id)){
            InputValidationError.throw('project id');
        }
        if(!worker_id || !isMongoId(worker_id)){
            InputValidationError.throw('worker id');
        } 

        const project = await Project.findById({ _id: project_id });
        if(!project){
            NotFound.throw('project not found');
        }

        const worker = await User.findById({ _id: worker_id });
        if(!worker){
            NotFound.throw('worker not found');
        }

        if(worker._id.valueOf() == project.contact.valueOf()){
            CustomError.throw('Project contacts cannot be added as workers to the same project');
        }

        if(project.findUserById(worker._id)){
            CustomError.throw(`${worker.firstName} ${worker.lastName} is already part of this project`);
        }

        if(!project.isQualified(worker.skills)){
            CustomError.throw(`${worker.firstName} ${worker.lastName} isn't qualified for the project`);
        }

        project.workers.push(worker._id);
        await project.save();

        const projectUpdate = await Project.findById({ _id: project_id }).populate([
            { 
                path: 'contact', 
                select: 'firstName lastName picture'
            }, 
            { 
                path: 'workers', 
                populate: {
                    path: 'skills',
                    select: '_id name level description'
                },
                select: 'firstName lastName picture email cell street city state zipcode rating hourly_rate'
            },
            { 
                path: 'skills', 
                select: '_id name level description'
            }
        ]).lean();

        if(!projectUpdate){
            CustomError.throw('worker not added to project');
        }

        res.locals = projectUpdate;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// UPDATE remove one worker
const removeWorker = async(req, res, next) => {
    try {
        const { project_id, worker_id } = req.body;

        if(!project_id || !isMongoId(project_id)){
            InputValidationError.throw('project id');
        }
        if(!worker_id || !isMongoId(worker_id)){
            InputValidationError.throw('worker id');
        } 

        const project = await Project.findById({ _id: project_id });
        if(!project){
            NotFound.throw('project not found');
        }

        const worker = await User.findById({ _id: worker_id });
        if(!worker){
            NotFound.throw('worker not found');
        }

        project.workers.pull(worker._id);
        await project.save();

        const projectUpdate = await Project.findById({ _id: project_id }).populate([
            { 
                path: 'contact', 
                select: 'firstName lastName picture'
            }, 
            { 
                path: 'workers', 
                populate: {
                    path: 'skills',
                    select: '_id name level description'
                },
                select: 'firstName lastName picture email cell street city state zipcode rating hourly_rate'
            },
            { 
                path: 'skills', 
                select: '_id name level description'
            }
        ]).lean();

        if(!projectUpdate){
            CustomError.throw('worker not removed from project');
        }

        res.locals = projectUpdate;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// UPDATE add a skill that is needed for the project
const addSkill = async(req, res, next) => {
    try {
        const { project_id, skill_id } = req.body;

        if(!project_id || !isMongoId(project_id)){
            InputValidationError.throw('project id');
        }
        if(!skill_id || !isMongoId(skill_id)){
            InputValidationError.throw('skill id');
        }

        const project = await Project.findById({ _id: project_id });
        if(!project){
            NotFound.throw('project not found');
        }

        const skill = await Skill.findById({ _id: skill_id });
        if(!skill){
            NotFound.throw('skill not found');
        }

        if(await project.findSkillById(skill._id)){
            CustomError.throw(`${skill.name} is already a stated project requirement`);
        }

        project.skills.push(skill._id);
        await project.save();

        const projectUpdate = await Project.findById({ _id: project_id }).populate([
            { 
                path: 'contact', 
                select: 'firstName lastName picture'
            }, 
            { 
                path: 'workers', 
                populate: {
                    path: 'skills',
                    select: '_id name level description'
                },
                select: 'firstName lastName picture email cell street city state zipcode rating hourly_rate'
            },
            { 
                path: 'skills', 
                select: '_id name level description'
            }
        ]).lean();

        if(!projectUpdate){
            CustomError.throw('skill not added to project');
        }

        res.locals = project;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

// UPDATE remove skill requirement from a project
const removeSkill = async(req, res, next) => {
    try {
        const { project_id, skill_id } = req.body;

        if(!project_id || !isMongoId(project_id)){
            InputValidationError.throw('project id');
        }
        if(!skill_id || !isMongoId(skill_id)){
            InputValidationError.throw('skill id');
        }

        const project = await Project.findById({ _id: project_id });
        if(!project){
            NotFound.throw('project not found');
        }

        const skill = await Skill.findById({ _id: skill_id });
        if(!skill){
            NotFound.throw('skill not found');
        }

        project.skills.pull(skill._id);
        await project.save();

        res.locals = project;
        res.status(200).json(res.locals);
    } catch(error) {
        next(error);
    }
}

// DELETE one worker
const deleteProject = async(req, res, next) => {
    try {
        const { id } = req.body;
        if(!id || !isMongoId(id)){
            InputValidationError.throw('project id');
        }

        const deletedProject = await Project.findByIdAndDelete({ _id: id });
        if(!deletedProject){
            BadRequest.throw('project not deleted');
        }

        res.locals = deletedProject;
        res.status(200).json(res.locals);

    } catch(error) {
        next(error);
    }
}

module.exports = { 
    getProjects,
    getProjectById,
    createProject,
    updateProjectSpecs,
    addWorker,
    removeWorker,
    addSkill,
    removeSkill,
    deleteProject
};