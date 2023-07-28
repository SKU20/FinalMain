const express = require('express')
const app = express()
const path=require("path")
const hbs = require("hbs")
const async = require('hbs/lib/async')
const collection = require("./mongodb")

const tempelatePath = path.join(__dirname,'../tempelates')

app.use(express.json())
app.set("view engine","hbs")
app.set("views",tempelatePath)
app.use(express.urlencoded({extended:false}))

app.get("/", (req,res)=>{
    res.render("login")
})
app.get("/signup", (req,res)=>{
    res.render("signup")
})

app.post("/signup",async (req,res)=>{
     const data={
        email:req.body.email,
        password:req.body.password
     }

   await collection.insertMany([data])

   res.render("home")
})

app.listen(3001,()=>{
    console.log("prot Connected")
})