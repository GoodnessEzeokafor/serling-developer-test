// const config =  require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    },
    isAdmin:Boolean
})

userSchema.methods.generateAuthtoken = function(secretKey){
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin },secretKey);
    // console.log("PRIVATE KEY",)
    return token
}
const User = mongoose.model('User', userSchema)
function validateUser(user){
    const schema = {
        username:Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema)

}
exports.User = User; 
exports.validate = validateUser;