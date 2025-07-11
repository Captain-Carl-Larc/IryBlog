const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 10,
      maxlength: 100,
      required: true,
    },
    description: {
      required: true,
      type: String,
    },
    content: {
      type: String,
      required: true,
      minlength: 50,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
