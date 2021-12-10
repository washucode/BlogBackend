const db = require("../utils/db")
const Admin = require("../models/Admin")
var jwt = require('jsonwebtoken')
var bycrpt = require('bcryptjs')
const passport = require("passport")

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const secret = process.env.SECRET_KEY

const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../strategies/authenticate")


exports.createNewUser = (req,res,next)=>{
    var hashedPassword =bycrpt.hashSync(req.body.password,8)
    var opt = {
        email:req.body.email,
        username:req.body.username,
        profilepic:req.body.profilepic,
        password:hashedPassword
      }
    
   
   
    
         
    new Admin(opt).save((err,user)=>{
            if(err){
                res.statusCode = 500
                res.send(err)
            }
            else{

                var token = jwt.sign({id:user._id},secret,{
                    expiresIn: 86400
                })

                res.status(201).send({auth:true, token:token});
                }

            
        })
     }    


exports.loginUser =  (req,res)=>{
    Admin.findOne({ username: req.body.username }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        
        var passwordIsValid = bycrpt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        
        var token = jwt.sign({ id: user._id },secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        
        res.status(200).send({ auth: true, token: token });
        
      });
}


exports.logout = (req,res)=>{

    

    res.status(200).send({ auth: false, token: null });
}

exports.getLoggedIn = (req,res)=>{

    // console.log(req.req.headers);
    var token = req.headers['authorization'];
   
    if (!token){
        res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token.split(' ')[1], secret, function(err, decoded) {
        if (err) return res.send({ auth: false, message: 'Failed to authenticate token.' });
        
        
        Admin.findById(decoded.id,{password:0},(err,user)=>{
            if(err) return res.status(500).send("There was a problem funding the user");
        
            if(!user) return res.status(404).send('No user found');
        
            res.status(200).send(user);

        });
    
        
    });

}

exports.loginRequired = (req, res, next) => {

    // var token = req.headers['authorization'];
   
    // if (!token){
    //     res.status(401).send({ auth: false, message: 'Unauthorized User' });
    // }
    
    // jwt.verify(token.split(' ')[1], secret, function(err, decoded) {
    //     if (err) return res.send({ auth: false, message: 'Failed to authenticate token.' });
    //     req.user = decoded
    //     next();
    // });

    if (req.user) {
    res.json({ message: 'Authorized User, Action Successful!'});
        } else {
    res.status(401).json({ message: 'Unauthorized user!' });
        }
};