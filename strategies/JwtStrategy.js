const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt

const Admin = require('../models/Admin')

if (process.env.NODE_ENV !== "production") {
    // Load environment variables from .env file in non prod environments
    require("dotenv").config()
  }

const opts ={}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET
// opts.Authorization= Bearer{token}


passport.use(
    new JwtStrategy(opts, function(jwt_payload,done){
        Admin.findById(jwt_payload.data._id,function(err,admin){
            if(err){
                return done(err,false)
            }
            if(admin){
                return done(null,admin)
            }
            else{
                return done(null,false)
            }
               
            
        })
    })
)