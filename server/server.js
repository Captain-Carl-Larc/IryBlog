//imports
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors")
const connectDb = require('./config/db')


//configurations
const app = express() //initialize express app
dotenv.config()

//Basic middleware
app.use(express.json())


//simple  test constants
const mongoDbUri = process.env.MONGO_URI;

const PORT = process.env.PORT
//connect to db
connectDb(mongoDbUri);
//giving feedback
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}.`)
})

