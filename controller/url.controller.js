const { URL } = require('../models/Url.model');
const crypto = require('crypto');
exports.handleUrl= async (req,res)=>{
   try {
      const shortid = crypto
      .randomBytes(Math.ceil(7 / 2))
      .toString("hex")
      .slice(0, 7);

      if (!req.body.url) {

         return res.status(400).json({message:"please enter the URL !"})
      }
      const userId = req.body.userId? req.body.userId :null
      if (userId ===null) {
         await URL.create({
            shortId: shortid,redirectUrl:req.body.url ,visitHistory:[]})
         
      }
      else{
         
         await URL.create({
            shortId: shortid,redirectUrl:req.body.url ,visitHistory:[],user:userId
         })
      }
      return res.status(201).json({id:shortid,message:"link shortened successfull",redirectUrl:`${process.env.BASE_URL}${shortid}`})
      
   } catch (error) {

      return res.status(500).json({message:error.message})
   }
}



exports.redirectUrl = async (req, res) => {
   try {
       const shortid = req.params.shortId;
       const entry = await URL.findOneAndUpdate(
         {
           shortId:shortid,
         },
         { $push: { visitHistory: { timestamp: Date.now() } } }
       );
  res.redirect(entry.redirectUrl)
 } catch (error) {
   res.status(500).json(error)
   }
};