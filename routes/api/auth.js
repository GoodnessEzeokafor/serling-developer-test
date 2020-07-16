const express = require('express')
const router = express.Router()


const Joi = require('joi')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {User} = require('../../models/User')



router.post('/', async(req, res) => {
    const {error} = Joi.validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)
  
    
    let user = await User.findOne({
        email:req.body.email
    })
    if(!user) return res.status(400).json("Invalid email or password.")

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json('Invalid email or password.');
  

    const token = user.generateAuthtoken(`vtg7880h)&*%^%@$g52`);

    res.json(token);
})


function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
return Joi.validate(req, schema);
}

  
module.exports = router; 

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjBkZmNlYjlhMWViZTE4Njk0MDBmM2UiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTQ4MjA3ODZ9.YQ4yw3a_nucBuYN5pmYHbM_rLCN4kaCHkyRuzISAeS8"