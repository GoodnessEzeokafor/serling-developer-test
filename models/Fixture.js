const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const FixtureSchema =  new Schema({
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
    status:{
        type:String,
        default:"pending"
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
})



function validateFixture(fixture){
    const schema = {
        title:Joi.string().min(5).max(100).required(),
        user: Joi.objectId().required(),
        team1:Joi.string().min(5).max(100).required(),        
        team2:Joi.string().min(5).max(100).required(),
   }

   return Joi.validate(fixture, schema)
}
FixtureSchema.index({
    title: 'text',
    team1: 'text',
    team2:"text",
    status:"text"
  }, {
    weights: {
      title: 5,
      team1:2,
      team:2,
      status: 4,
    },
  });
module.exports = {
    Fixture:mongoose.model("Fixture", FixtureSchema),
    validate : validateFixture
}
// exports.Fixture = Fixture
// exports.validate = validateFixture

// module.exports =Project = mongoose.model("ProjectSchema", ProjectSchema)
// const term = 'apple';

// Product.find({
//   $text: { $search: term },
// })
//   .then(products => console.log(products))
//   .catch(e => console.error(e));