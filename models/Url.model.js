const mongoose = require('mongoose');
const UrlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required :true,
        unique:true
    },
    redirectUrl :{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{type:Number}}],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' ,
        default:null
    }

},{timestamps:true})

exports.URL = mongoose.model("URLs",UrlSchema)