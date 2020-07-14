const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const mongoose = require('mongoose')


const Fixture = mongoose.model('Fixture', new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true,
        minLength:5,
        maxlength:100
    },
    team1:{
        type:String,
        required:true,
        minLength:5,
        maxlength:100
    },
    team2:{
        type:String,
        required:true,
        minLength:5,
        maxlength:100
    },
    link:{
        type:String
    },
    date_created:{
        type:Date,
        default:Date.now
    },
    date_updated:{
        type:Date,
        default:Date.now
    }
}))


function validateFixture(fixture){
    const schema = {
        title:Joi.string().min(5).max(100).required(),
        user: Joi.objectId().required(),
        phone:Joi.string()
   }

   return Joi.validate(fixture, schema)
}


exports.Fixture = Fixture
exports.validate = validateFixture