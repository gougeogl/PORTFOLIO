/***************************************************************
 ◘ filename: User.model.js
 ◘ Description:
    Mongoose JS model 'User' schema & model definition file.
    Used by OddJobber App
 ***************************************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// VALIDATORS
const { 
    isStrongPassword,
    isEmail, 
    isMobilePhone,
    isPostalCode,
    isCurrency 
} = require('validator');

// CUSTOM VALIDATORS & ERROR CLASSES
const { CustomError } = require('../errors/Error.custom.class');
const isUSstate = require('../utilities/validators/isUsState');
const hasJpegOrPngSuffix = require('../utilities/validators/hasJpegOrPngSuffix');


// CONSTANTS
const SALT_ROUNDS = 12;
const MIN_PASSWORD_LENGTH = 10;

const userSchema = new Schema({
    username: {
        type: String, 
        required: [true, 'missing username'], 
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'missing password']
    },
    firstName: {
        type: String,
        required: [true, 'missing first name']
    },
    lastName: {
        type: String,
        required: [true, 'missing last name']
    },
    picture: {
        type: String,
        default: null
    },
    email: {
        type: String, 
        required: [true, 'missing email address']
    },
    cell: {
        type: String,
        default: 'unlisted'
    },
    street: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    zipcode: {
        type: String,
        default: null
    },
    skills: [{
        type: mongoose.ObjectId,
        ref: 'Skill'
    }],
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 5
    },
    hourly_rate: {
        type: String,
        default: '$17.00'
    }
}, { timestamps: true });

// validate unique username
userSchema.pre('save', async function(next){
    if(!this.isModified('username')){
        next();
    }

    const existingUser = await User.findOne({'username': this.username});
    if(existingUser){
        CustomError.throw('invalid username');
    }
});

// validate password strength & hash it
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    if(this.password.length < MIN_PASSWORD_LENGTH){
        CustomError.throw('Password is too short');
    }

    if(!isStrongPassword(this.password)){
        CustomError.throw('Password is too weak');
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
});

// validate unique fullname
userSchema.pre('save', async function(next){
    if(!this.isModified('firstName') && !this.isModified('lastName')){
        next();
    }

    const existingUser = await User.findOne({ "firstName": this.firstName, "lastName": this.lastName });
    if(existingUser){
        CustomError.throw('you already have an account');
    }
});

// validate picture format (jpeg or png)
userSchema.pre('save', async function(next){
    if(!this.picture || !this.isModified('picture')){
        next();
    }

    if(this.picture && !hasJpegOrPngSuffix(this.picture)){
        CustomError.throw('pictures must be jpeg or png only');
    }
});

// validate email 
userSchema.pre('save', async function(next){
    if(!this.isModified('email')){
        next();
    }

    if(!isEmail(this.email.toString())){
        CustomError.throw('invalid email format');
    }

});

// validate cell
userSchema.pre('save', async function(next){
    if(!this.isModified('cell')){
        next();
    }

    if(this.cell && !isMobilePhone(this.cell.toString(), ['en-US'])){
        CustomError.throw('invalid US phone number');
    }

});

userSchema.pre('save', async function(next){
    // skip validation of address attributes if none of them have changed
    if((!this.isModified('street') && !this.isModified('city')) && (!this.isModified('state') && !this.isModified('zipcode'))){
        next();
    }

    // if the address is empty, skip validation
    if(!this.street && !this.city && !this.state && !this.zipcode){
        next();
    }

    // if any address attribute exists, ensure all attributes exist
    if(!this.street || !this.city || !this.state || !this.zipcode){
        CustomError.throw('a complete address is required')
    }

    // validate US state
    if(!isUSstate(this.state)){
        CustomError.throw('a valid US state, code, or abbreviation is required');
    }

    // validate US zipcode
    if(!isPostalCode(this.zipcode.toString(), ['US'])){
        CustomError.throw('invalid US zipcode');
    }
});

// validate rating range
userSchema.pre('save', async function(next){
    if(!this.isModified('rating')){
        next();
    }

    if(this.rating < 1 || this.rating > 10){
        CustomError.throw('user rating should be 1 to 10 only');
    }
});

// validate hourly_wage
userSchema.pre('save', async function(next){

    const options = { 
        symbol: '$', 
        require_symbol: true, 
        allow_space_after_symbol: false, 
        symbol_after_digits: false, 
        allow_negatives: false, 
        parens_for_negatives: false, 
        negative_sign_before_digits: false, 
        negative_sign_after_digits: false, 
        allow_negative_sign_placeholder: false, 
        thousands_separator: ',', 
        decimal_separator: '.', 
        allow_decimal: true, 
        require_decimal: false, 
        digits_after_decimal: [2], 
        allow_space_after_digits: false 
    }

    if(!isCurrency(this.hourly_rate.toString(), options)){
        CustomError.throw(`hourly rates are in US format, e.g. $X,XXX.XX`);
    }
});

// Decrypt password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// Search for a skill by id
userSchema.methods.findSkillById = function(id){
    // matches will result in an array of ids that has a length
    if(this.skills.filter(skill => skill.valueOf() == id).length){
        return true;
    } else {
        return false;
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;