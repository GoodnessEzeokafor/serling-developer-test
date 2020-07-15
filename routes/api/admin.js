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


/** EDIT TEAM  */
/** EDIT TEAM */

/** DELETE TEAM  */

/** DELETE TEAM  */


/** CREATE FIXTURES */
/** CREATE FIXTURES */


/** EDIT FIXTURES */
/** EDIT FIXTURES */

/** REMOVE FIXTURES */

/** REMOVE FIXTURES */
module.exports = router;
