/***************************************************************
 ◘ filename: Skill.model.js
 ◘ Description:
    Mongoose JS model 'Skill' schema & model definition file.
    Used by OddJobber App
 ***************************************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Custom Error Handling
const { CustomError } = require('../errors/Error.custom.class');
const hasJpegOrPngSuffix = require('../utilities/validators/hasJpegOrPngSuffix');

const skillSchema = new Schema({
    name: {
        type: String,
        required: [true, 'missing skill name']
    },
    description: {
        type: String,
        required: [true, 'missing skill description']
    },
    picture: {
        type: String,
        default: null
    },
    level: {
        type: String,
        default: 'novice',
        enum: ['novice', 'intermediate', 'professional']
    }
});

skillSchema.pre('save', async function(next){
    if(!this.isModified('picture')){
        next();
    }

    if(!hasJpegOrPngSuffix(this.picture)){
        CustomError.throw('pictures must be jpeg or png only');
    }
});

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;