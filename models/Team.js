const Joi = require('joi')
const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const TeamSchema =  new Schema({
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
        type:String,
        required:true
    }
})




function validateTeam(team){
    const schema = {
        team_name:Joi.string().min(5).max(50).required(),
        team_description:Joi.string().min(5).max(500).required(),
        team_coach:Joi.string().required(),
        team_size:Joi.number().required()
   }
   return Joi.validate(team, schema)
}

TeamSchema.index({
    team_name: 'text',
    team_description: 'text',
    team_coach:"text"
  }, {
    weights: {
        team_name: 5,
        team_description:5,
        team_coach:5
    },
  });
module.exports = {
    Team:mongoose.model("Team", TeamSchema),
    validateTeam : validateTeam
}