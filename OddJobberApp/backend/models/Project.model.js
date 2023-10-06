/***************************************************************
 ◘ filename: Project.model.js
 ◘ Description:
    Mongoose JS model 'Project' schema & model definition file.
    Used by OddJobber App
 ***************************************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isDate } = require('validator');
const { CustomError } = require('../errors/Error.custom.class');
const { v4: uuidv4 } = require('uuid');

const projectSchema = new Schema({
    job_number: String,
    contact: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: [true, 'missing project description']
    },
    workers: [{
        type: mongoose.ObjectId,
        ref: 'User'
    }],
    deadline: {
        type: Date,
        required: [true, 'missing project deadline']
    },
    status: {
        type: String,
        enum: ['not started', 'in progress', 'behind schedule', 'complete']
    },
    skills: [{
        type: mongoose.ObjectId,
        ref: 'Skill'
    }],
});

// generate a job number range
projectSchema.pre('save', async function(next){
    if(!this.job_number){
        this.job_number = uuidv4(); 
    } 
});

projectSchema.pre('save', async function(next){
    if(!this.isModified('deadline')){
        next();
    }

    if(!isDate(this.deadline)){
        CustomError.throw('deadline must be in a valid date format');
    }
});

// Search for a user (worker) by id
projectSchema.methods.findUserById = function(id){
    // matches will result in an array of ids that has a length
    if(this.workers.filter(worker => worker.valueOf() == id).length){
        return true;
    } else {
        return false;
    }
}

// Search for a required project skill by id
projectSchema.methods.findSkillById = function(id){
    // matches will result in an array of ids that has a length
    if(this.skills.filter(skill => skill.valueOf() == id).length){
        return true;
    } else {
        return false;
    }
}

/* *******************************************************************
    NAME: isQualified
    PARAMS: array of ObjectIds from 1 worker representing their skills
    Description:
        1. returns true if the project doesn't require any skills
        2. searches through every project skill and compares against
           the worker's skill (ObjectIds)
        3. saves any matches
        4. If the array of matches has length, then they have at 
           least 1 skill, and are qualified
******************************************************************** */
projectSchema.methods.isQualified = function(worker_skills){
    if(this.skills.length < 1){
        return true;
    }

    let findings = [];

    for(let projectSkill of this.skills){
        if(projectSkill.valueOf() == 'undefined'){
            continue;
        }
        for(let workerSkill of worker_skills){
            if(workerSkill.valueOf() == 'undefined'){
                continue;
            }
            if(workerSkill.valueOf() == projectSkill.valueOf()){
                findings.push(workerSkill.valueOf());
            }
        }
    }
    if(findings.length){
        return true;
    } else {
        return false;
    }
}

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;