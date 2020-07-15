const express = require("express");
const router = express.Router();
const {User} = require("../../models/User")
const admin = require("../../middleware/admin")
const auth = require("../../middleware/auth")
const {Team , validateTeam} = require("../../models/Team")
const {Fixture, validateFixture} = require("../../models/Fixture")

/** set admin **/
router.put("/set-admin/:id",auth,async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, {$set:{
            'isAdmin':true
        }})
        res.json(user)
    }catch(e){
        return res.status(400).json(e.message); 
    }
})


/** set admin **/

// 5f0dfceb9a1ebe1869400f3e
/** GET ALL USERS */
router.get("/get-users",auth,admin, async(req, res) => {
    try{
        const user = await User.find()
        res.json(user)
    }catch(e){
        return res.status(400).json(e.message); 
    }
})
/** GET ALL USERS */


/** CREATE TEAM  */
router.post("/create-team", auth, admin, async(req, res) => {
    try{
        const { error } = validateTeam(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
        let team = new Team({
            team_name: req.body.team_name,
            team_description: req.body.team_description,
            team_coach:req.body.team_coach,
            team_size:req.body.team_size
        })
        team = await team.save();
    res.json(team);
    }catch(e){
        return res.status(400).json(e.message); 
    }
})
/** CREATE TEAM  */


/** LIST TEAMS */
router.get("/list-teams", auth,admin,async(req, res) => {
    try{
        let teams = await Team.find()
        res.json(teams)
    }catch(e){
        return res.status(400).json(e.message); 
    }
})
/** LIST TEAMS */

/** EDIT TEAM  */
router.put("/edit-team/:id", auth, admin, async(req, res) => {
    try{
        const { error } = validateTeam(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
        const team = await Team.findByIdAndUpdate(req.params.id, {$set:{
            'team_name': req.body.team_name,
            'team_description': req.body.team_description,
            'team_coach':req.body.team_coach,
            'team_size':req.body.team_size
        }}) 
        // team = await team.save();
        res.json(team);    
    }catch(e){
        return res.status(400).json(e.message); 
    }
})
/** EDIT TEAM */

/** DELETE TEAM  */
router.delete("/delete-team/:id", auth, admin, async(req, res) => {
    try{

        const team = await Team.findByIdAndRemove(req.params.id) 
        // team = await team.save();
        res.json("DELETED!!!");    
    }catch(e){
        return res.status(400).json(e.message); 
    }
})
/** DELETE TEAM  */


/** CREATE FIXTURES */

router.post("/create-fixture", auth, admin, async(req, res) => {
    try{
        const { error } = validateFixture(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
        let fixture = new Fixture({
            title:req.body.title,
            team1:req.body.team1,        
            team2:req.body.team2,
        })
        fixture = await fixture.save();
    res.json(fixture);
    }catch(e){
        return res.status(400).json(e.message); 
    }
})
/** CREATE FIXTURES */

/** LIST FIXTURES */
router.get("/list-fixtures", auth,admin,async(req, res) => {
    try{
        let fixtures = await Fixture.find().populate("team1").populate("team2")
        res.json(fixtures)
    }catch(e){
        return res.status(400).json(e.message); 
    }
})

/** LIST FIXTURES */

/** EDIT FIXTURES */

/** EDIT FIXTURES */

/** REMOVE FIXTURES */

/** REMOVE FIXTURES */
module.exports = router;
