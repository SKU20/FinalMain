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
  
    const { email, password,repassword} = req.body;
    const user = await collection.findOne({ email });
    
     if(user){
        return res.render("signup",{error: "Email is already used"})
     }
     else if(password !== repassword || !/[A-Z]/.test(password) || !/[0-9]/.test(password)){
        return res.render("signup")
     }
     const data={
        name:req.body.name,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
        date:req.body.date
     }

   await collection.insertMany([data])

   res.render("home")
})
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await collection.findOne({ email });
  
    if (!user) {
      return res.render("login", { error: "Invalid email or password." });
    }
  
    if (user.password !== password) {
      return res.render("login", { error: "Invalid email or password." });
    }
  
    res.render("home");
  });
app.listen(3001,()=>{
    console.log("prot Connected")
})