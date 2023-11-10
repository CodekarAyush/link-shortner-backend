const mongoose = require('mongoose');
require('dotenv').config()
const envVar = process.env
exports.connectDB = ()=>{
    mongoose.connect(`mongodb+srv://${envVar.DB_USERNAME}:${envVar.DB_PASSWORD}@linkshortner.hhnjazw.mongodb.net/${envVar.DB_NAME}?retryWrites=true&w=majority`).then(()=>{
        console.log(`connected to the database`);
    }).catch((err)=>{
        console.log(err);
    })
}