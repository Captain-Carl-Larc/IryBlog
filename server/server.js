//imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


//configurations
const app = express() //initialize express app
dotenv.config()

//Basic middleware
app.use(express.json())


//simple  test constants
const PORT = 5000


//giving feedback
app.listen(()=>{
    console.log(`server is running at port ${PORT}.`)
})

