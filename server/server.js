//imports
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");


//configurations
const app = express() //initialize express app
dotenv.config()

//Basic middleware
app.use(express.json())


//simple  test constants
const mongoDbUri = process.env.MONGO_URI;

const PORT = process.env.PORT

//giving feedback
app.listen(()=>{
    console.log(`server is running at port ${PORT}.`)
})

