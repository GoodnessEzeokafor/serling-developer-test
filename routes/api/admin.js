const express = require("express");
const router = express.Router();
const {User} = require("../../models/User")
const admin = require("../../middleware/admin")
const auth = require("../../middleware/auth")

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
