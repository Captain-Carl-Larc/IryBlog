const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
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
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  //check if password has been modified
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

// --- Method to compare password for login ---
userschema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("User", UserSchema);