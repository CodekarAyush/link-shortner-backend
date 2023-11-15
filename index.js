const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors')
const UrlRouter = require('./routes/url.route');
const userRoute = require('./routes/Users.route')
const { connectDB } = require('./config/db.config');
const { redirectUrl } = require('./controller/url.controller');
const functionalityRouter = require('./routes/functionality.route')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin : 'http://localhost:3000', credentials: true
}))

app.use(cookieParser())
app.use(express.json())
connectDB()
app.use('/api/url',UrlRouter);
app.use('/api/users',userRoute);
app.use('/api/functionality',functionalityRouter);
app.get('/:shortId',redirectUrl)
app.get('/tt',(req,res)=>{
  res.send("welcome to cromax")
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
