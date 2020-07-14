const jwt = require('jsonwebtoken')
// const config = require('config')

module.exports = function(req, res, next){
    const token = req.header('X-auth-token')
    if(!token) return res.status(401).send('Access denied. No tken provided')
    try{
        const decoded = jwt.verify(token, `vtg7880h)&*%^%@$g52`);
        req.user = decoded
        next()
    }catch(e){
        res.status(400).send('invalid token')
    }
}   