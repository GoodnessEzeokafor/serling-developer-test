const express = require("express");
const router = express.Router();


const auth = require("../../middleware/auth")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const _ = require("lodash")


const {User, validate} = require("../../models/User")
const mongoose = require("mongoose")
const {valid} = require('joi')



router.get("/me", auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password')
            .catch((e) => {
                return  res.status(400).json(e.message)
            })
    res.json(user)
})

router.post("/", async(req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    
    if(req.body.password != req.body.confirmPassword){
        return res.status(400).json('Password Must Be The Same'); 
    }
    let user = await User.findOne({
        email:req.body.email
    })

    /** CHECKS IF USER ALREADY EXISTS */
    if (user) return res.status(400).json('User already registered.'); 
    /** ENDCHECK */
  
    
    user = new User(_.pick(req.body, ['username', 'email', 'password']));


    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)
    await user.save()
    const token = user.generateAuthtoken(`vtg7880h)&*%^%@$g52`)
    res.header('x-auth-token',token).json({
        token,
        id:user._id,
        username:user.username,
        email:user.email
    })
})

module.exports = router;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjBlMDAxM2IxYTIwZjNmNDJjNTRkMDciLCJpYXQiOjE1OTQ3NTMwNDR9.7LJ4cw_0G0DHlK4vog_2Oj7-D9K-END_w6hO1-4Tkws