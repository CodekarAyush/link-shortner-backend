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

exports.deleteLogs =async (req,res)=>{
    try {
        const userId = req.params.userId
        console.log(userId);
        const deleted = await URL.findByIdAndDelete(userId)
        if (!deleted) {
            return res.status(400).json({message:"Error in deleting"})
        }
         res.status(200).json({message:"Deletion successful"})
        } catch (error) {
            
            res.status(500).json({message:error.message})
    }

}