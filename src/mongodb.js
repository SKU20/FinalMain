const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/userInformation")
.then(()=>{
    console.log("userinfo Connected")
})
.catch((err)=>{
    console.log(err)
})
const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const ProductSchema = new mongoose.Schema({
  count: {
    type: Number,
    startAt: 1,
    incrementBy: 1
  },
  photoName: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  }
});

const collection = mongoose.model("LoginInfo", LogInSchema);
const productCollection = mongoose.model("products", ProductSchema);

module.exports = { collection, productCollection };
