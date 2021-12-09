const passport = require("passport")
const jwt = require("jsonwebtoken")
const dev = process.env.NODE_ENV !== "production"

//create the refresh token cookie
exports.COOKIE_OPTIONS={
    httpOnly:true, 
    secure: !dev,//prevent reading by client js
    signed:true,
    maxAge:eval(process.env.REFRESH_TOKEN_EXPIRY)*1000,
    sameSite:"none"
}

//create JWT

exports.getToken= admin =>{
    return jwt.sign(admin,process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: eval(process.env.SESSION_EXPIRY)
    })
}

//create refresh token
exports.getRefreshToken = admin =>{
    const refreshToken = jwt.sign(admin, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
      })
    return refreshToken
}

exports.verifyUser = passport.authenticate("jwt", { session: false })



