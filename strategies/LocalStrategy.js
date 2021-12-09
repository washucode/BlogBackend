const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const Admin = require("../models/Admin")

//during login/sign up.
passport.use(new LocalStrategy(Admin.authenticate()))

// set user details in req.user after login/sign up
passport.serializeUser(Admin.serializeUser())