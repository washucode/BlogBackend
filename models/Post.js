const mongoose = require("mongoose");


const Posts = new mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  prevImage: String,
  posttags:String,
  author:String,
  state:String,
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const Post = mongoose.model('Post', Posts)

module.exports = Post