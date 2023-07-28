const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/userInformation")
.then(()=>{
    console.log("mongodb Connected")
})
.catch((err)=>{
    console.log(err)
})

const LogInSchema = new mongoose.Schema({
    name:{
        type:String,
        rquired:true
    },
    lastname:{
        type:String,
        rquired:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        rquired:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        rquired:true
    }
})

const collection = new mongoose.model("LoginInfo",LogInSchema)

module.exports = collection