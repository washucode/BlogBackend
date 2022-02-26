const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const app = express();
const passport = require("passport")
const formidable = require("formidable")

//for images upload
var multer = require('multer')
const util = require("util");
const fs = require("fs");
const path = require("path")
// const uniqueString = require("unique-string");
const readDir = util.promisify(fs.readdir);
const uuid = require('uuidv4')


const DIR = 'public/images'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuid() + '-' + fileName)
  }
});

var upload = multer({
  storage:storage,
  fileFilter:(req,file,cb)=>{
    if(file.mimetype=="image/png"|| file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
        cb(null, false);
    
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})


async function getImage(dir) {
  try {
    return await readDir(path.join(__dirname, "public", dir));
  } catch (error) {
    throw error;
  }
}



app.use((req,res,next)=>{
        
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  

})


app.options('*', cors()); 




//uploadimage
app.post("/api/image",upload.single("prevImage"),(req,res,next)=>{ 
  const url = req.protocol +'://'+req.get('host')
  res.send(url)

})





app.use(express.static(path.join(__dirname, "public")));

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