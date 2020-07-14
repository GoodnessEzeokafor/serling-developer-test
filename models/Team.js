const Joi = require('joi')
const mongoose = require('mongoose')



const Team = mongoose.model('Team', new mongoose.Schema({
    team_name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    team_description:{
        type:String,
        required:true,
        minlength:5,
        maxlength:500
    },
    team_size:{
        type:Number,
        required:true
    },
    team_coach:{
        type:Number,
        required:true
    }
}))




function validateTeam(team){
    const schema = {
        team_name:Joi.string().min(5).max(50).required(),
        team_description:Joi.string().min(5).max(500).required()
   }
   return Joi.validate(team, schema)
}


exports.Team = Team
exports.validate = validateTeam