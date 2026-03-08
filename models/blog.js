const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default:"images/blog.jpg",
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
