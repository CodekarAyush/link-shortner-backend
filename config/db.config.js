const mongoose = require('mongoose');
require('dotenv').config()
const db = process.env.DATABASE
exports.connectDB = ()=>{
    mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
        console.log(`connected to the database`);
    }).catch((err)=>{
        console.log(err);
        setTimeout(this.connectDB,5000)
    })
}