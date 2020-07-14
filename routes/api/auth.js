const express = require("express");
const router = express.Router();




const Joi = require("joi")
const bcrypt = require("bcrypt")
const _ = require("lodash")



router.post("/", async(req, res) => {
    const {error} = Joi.validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    let user = await user.findOne({
        email:req.body.email
    })
    .catch((e) => {
        return  res.status(400).json(e.message)
    } )
})
module.exports = router;
