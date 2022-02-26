const express =  require("express")
// const {checkDuplicate}= require('../strategies/verifyReg');
const authcontroller = require('../Controllers/authcontroller');
const blogController = require('../Controllers/blogcontroller')
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const secret = process.env.SECRET_KEY

const { getToken, COOKIE_OPTIONS, getRefreshToken,  verifyUser, } = require("../strategies/authenticate")
const Admin = require("../models/Admin")
require('../strategies/JwtStrategy')

router
    
    .use((req, res, next) => {
        if (req.headers && req.headers.authorization) {
          jwt.verify(req.headers.authorization.split(' ')[1],secret, (err, decode) => {
        if (err) req.user = undefined;
            req.user = decode;
            next();
            });
        } else {
          req.user = undefined;
          next();
        }
    })

    //user routes
    .post("/api/signup",authcontroller.createNewUser)
    .post(
        "/api/signin",authcontroller.loginUser
    )
    
    .get("/me",authcontroller.getLoggedIn)

     
     .get("/logout", authcontroller.logout)


     //post routes

    //publish post
    .post("/publish",blogController.createNewPost)
    //save post
    .post("/save",blogController.createNewDraft)
    //get published
    .get("/published", blogController.findAllPublished)
    // get drafts
    .get("/drafts",blogController.findAllDrafts)
    //get one post
    .get("/post/:id",blogController.findOnePost)
    //update post
    .put("/post/:id",blogController.updatePost)

    .delete("/post/:id",blogController.deletePost)
    .post("/postdata",(req,res)=>{
      // res.send(req.body)
      if(!req.body){
        res.send({status:false, message:"no data sent"})
      }
      console.log(req.body); 
    })
    
    
   
     

module.exports = router
