const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passport = require("passport-local-mongoose")

const session = new Schema({
    refreshToken:{
        type:String,
        default:""
    }
})
const Admin = new Schema({
    
    username:{
      type: String,
      unique:true,
      required:true
    },
    email: {
        type: String,
        unique:true,
      },
    password: {
        type: String,
        
        // default: Date.now
      },
    authStrategy: {
        type: String,
        default: "local",
      },
    profilepic:{
        type:String,
        default:"",
    },
    regDate:{
      type:Date,
      default:new Date()
    },
    refreshToken:{
        type:[session]
    }
  
  });

  Admin.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.refreshToken
      return ret
    },
  })

  Admin.plugin(passport)

  module.exports = mongoose.model('Admin',Admin)
