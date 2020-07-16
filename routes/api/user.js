const express = require("express");
const router = express.Router();


const auth = require("../../middleware/auth")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const _ = require("lodash")


const {User, validate} = require("../../models/User")
const mongoose = require("mongoose")
const {valid} = require('joi')


/** MODELS */
const {Team} = require("../../models/Team")
const {Fixture} = require("../../models/Fixture")

/** MODELS */


/** REDIS CONFIGURATION */
/** REDIS  CONFIGURATION */
const redis = require("redis");
const port_redis = process.env.REDIS_URL || 6379;
const redis_client = redis.createClient(port_redis);

// redis_client.setex(id, 3600, JSON.stringify(starShipInfoData));

/** REDIS  CONFIGURATION */

/** REDIS CONFIGURATION */

router.get("/", (req,res) => {
    res.send('HELLO')
})
router.get("/me", auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password')
            .catch((e) => {
                return  res.status(400).json(e.message)
            })
    redis_client.setex(user.username, 1020, JSON.stringify(user));
    res.json(user)
})

router.post("/", async(req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    
    // if(req.body.password != req.body.confirmPassword){
    //     return res.status(400).json('Password Must Be The Same'); 
    // }
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



router.get("/teams", auth,(req, res) => {
    Team.find()
        .then((team) => {
            redis_client.setex("teams", 3600, JSON.stringify(team));
            res.json(team)
        })
        .catch((e) => {
            return res.status(400).json(e.message); 
        })
})


/** PENDING FIXTURES */
router.get("/fixtures/pending", auth,async(req, res) => {
    console.log(Fixture.Fixture)
    // const fixture = Fixture.Fixture
    try{
        const get_fixture =await Fixture.find({}).where('status').equals('pending')
        redis_client.setex("pending_fixtures", 3600, JSON.stringify(get_fixture));
        res.json(get_fixture)
    }catch(e){
        return res.status(400).json(e.message); 
    }
 
    // const fixture = await Fixture.find({})
    //         // .where('status').equals('pending')
    //         .then((fixtures) => {
    //             res.json(fixtures)
    //         })
    //         .catch((e) => {
    //             return res.status(400).json(e.message); 
    //         })
})

/** COMPLETED FIXTURES */
router.get("/fixtures/completed", auth,async(req, res) => {
    try{
        const get_fixture =await Fixture.find({}).where('status').equals('completed')
        redis_client.setex("completed_fixtures", 3600, JSON.stringify(get_fixture));
        res.json(get_fixture)
    }catch(e){
        return res.status(400).json(e.message); 
    }

})


/** search fixture */
router.get("/fixtures/search", async(req, res) => {
    try{
        const query = req.query.search_term
        console.log(query)
        const search_fixtures = await Fixture.find({
              $text: { $search: query },              
        })
        redis_client.setex("searched_fixtures", 3600, JSON.stringify(search_fixtures));
        res.json(search_fixtures)
    }catch(e){
        return res.status(400).json(e.message); 
    }
})
/** end search fixtures */


/** search fixture */
router.get("/teams/search", async(req, res) => {
    try{
        const query = req.query.search_term
        console.log(query)
        const search_teams = await Team.find({
              $text: { $search: query },
              
        })
        redis_client.setex("searched_teams", 3600, JSON.stringify(search_teams));
        res.json(search_teams)
    }catch(e){
        return res.status(400).json(e.message); 
    }
})
/** end search fixtures */
module.exports = router;


// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjEwYmE2NTNjOTk3MDAwMTdlMjMwNzgiLCJpYXQiOjE1OTQ5MzE4NDd9.XlVMjETkeu37dyA5Wk2TjISVl2QeMSLO9GN-APqBIFM"
// 5f10ba653c99700017e23078
// https://sterling-assessment-test.herokuapp.com



// TEAMS ID

// 5f10bd673c99700017e23079

// 5f10bd703c99700017e2307a

// 5f10bd773c99700017e2307b

// 5f10bd7c3c99700017e2307c


// FIXTURE ID

//5f10bf913c99700017e2307d 
// 5f10bfa13c99700017e2307e