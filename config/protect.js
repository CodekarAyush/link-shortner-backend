const jwt = require("jsonwebtoken")
require('dotenv').config()
const secret = process.env.JWT_SECRET
exports.protect=async(req,res,next)=>{
const token = req.headers.authorization || req.cookies.token
const  t = token.split(" ")[1]
console.log(t);
if (!t) {
    return res.status(401).json({message:'Auth required'})
}
jwt.verify(t,secret,(err,decoded)=>{
    if (err) {
        return res.status(401).json({message:'invalid token'})
    }
    req.user= decoded;
    console.log(decoded);
    next()
})

}