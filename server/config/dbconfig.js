const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()
const db = process.env.MONGO_DB;

mongoose.connect(db,{})
.then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log("Error to connect" + err)
})