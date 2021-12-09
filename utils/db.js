const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const connectionString = process.env.DB_URL
 

// const options = {
//   reconnectTries: Number.MAX_VALUE,
//   poolSize: 10
// };

mongoose.connect(connectionString, { useNewUrlParser: true }).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);



require("../models/Admin")
