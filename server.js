const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const app = express();
const passport = require("passport")


app.use((req,res,next)=>{
        
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  

})


app.options('*', cors()); 

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config()
}

require('./utils/db')
require("./strategies/JwtStrategy")
require("./strategies/LocalStrategy")
require("./strategies/authenticate")

const adminRouter = require('./Routes/authRoutes'
)



// Token Verification 


// require('./Routes/authRoutes')(app)

// var corsOptions = {
//   origin: process.env.WHITELISTED_DOMAINS
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(passport.initialize())

app.use("/admin",adminRouter)
app.get("/", (req, res) => {
  res.send({ message: "Welcome to Bitlipa Backend." });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});