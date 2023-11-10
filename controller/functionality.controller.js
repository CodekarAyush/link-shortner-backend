const { URL } = require("../models/Url.model");
exports.logs= async(req,res)=>{
    try {
        const userId = req.user.userId
        const userdata = await URL.find({ user: userId })
        res.status(200).json(userdata)

    } catch (error) {
       
        res.status(500).json({message:error.message})
    }
}