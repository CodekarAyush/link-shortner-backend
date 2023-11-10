const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { parse, serialize } = require('cookie');

const { Users } = require('../models/Users.model');
require('dotenv').config()
const secret = process.env.JWT_SECRET
exports.register = async (req,res)=>{
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({message:'Required all details '})
          }
          const isExists = await Users.findOne({email:email})
          if (isExists) {
            return  res.status(409).json({message:'Email already exists ! '})
            
          }
          const hash = await bcrypt.hash(password,10)
          const resp=         await Users.create({username,email,password:hash})
          const token = jwt.sign({userid:resp._id},secret,{expiresIn:'24h'})
          
          // const cookieOptions ={
          //   httpOnly :true,
          //   maxAge:24*60*60*1000,
          //   path: '/', 
          //  secure: false,
          // }
        
          // res.setHeader('Set-Cookie',serialize('token',token,cookieOptions))
          res.status(200).json({message:'user registered successfully',token,userId : resp._id , email:resp.email, username:resp.username})
            
        } catch (error) {
        }
      }
      
      exports.login=async (req,res)=>{
        try {
          
          const {email, password} = req.body
          if (! email || ! password) {
            return res.status(400).json({message:' Username or Password is missing ! '})
          }
          const resp = await Users.findOne({email})
          const valid =  await bcrypt.compare(password,resp.password)
  
          if (valid) {
            const token = jwt.sign({userId:resp._id},secret,{expiresIn:'24h'})

            // const cookieOptions ={
            //   httpOnly :true,
            //   maxAge:24*60*60*1000
           
            // }
            const exp = Date.now() + 1000*60*60*24// 1 month exp
            res.cookie("Authorization",token,{
                       expires:new Date(exp),
                       httpOnly:true,
                       sameSite:'lax',
                       secure:process.env.NODE_ENV==='production',
            })
          // res.setHeader('Set-Cookie',serialize('token',token,cookieOptions))
          res.status(200).json({message:'Login successfully',token,userId : resp._id , email:resp.email, username:resp.username})
          
        }
        else{
            res.status(401).json({message:'Password Incorrect !'})

          }
        } catch (error) {
   
          res.status(500).json({message:error.message})
          
  }
}

