const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  firstName: {
    type: String,
    unique: false,
    trim: true,
  },
  lastName: {
    type: String,
    unique: false,
    trim: true,
  },
  email: {
    type: string,
    unique: true,
    trim: true,
    required: true,
    match: [/.+@.+\..+/, "Please fill a valid email address"], // Basic email validation
  },
  userName: {
    type: string,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    required: true,
    type: string,
    minlength: 6,
  }},{
    timestamps:true
  }
);


modules.export = userschema
