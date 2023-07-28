const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/userInformation")
.then(()=>{
    console.log("mongodb Connected")
})
.catch(()=>{
    console.log("Failed Connect")
})

const LogInSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = new mongoose.model("LoginInfo",LogInSchema)

module.exports = collection