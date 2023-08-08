const express = require('express')
const app = express()
const path=require("path")
const multer = require('multer')
const hbs = require("hbs")
const async = require('hbs/lib/async')
const {collection,productCollection} = require("./mongodb")
const { count } = require('console')
const tempelatePath = path.join(__dirname,'../tempelates')

app.use(express.json())
app.set("view engine","hbs")
app.set("views",tempelatePath)
app.use(express.urlencoded({extended:false}))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.get("/", (req,res)=>{
    res.render("login")
})
app.get("/signup", (req,res)=>{
    res.render("signup")
})
app.get("/admin", (req,res)=>{
  res.render("admin")
})
app.post("/home", (req,res)=>{
  const data = {
    name:req.body.name,
    lastname:req.body.lastname,
    email:req.body.email,
    phone:req.body.phone,
    password:req.body.password,
    date:req.body.date
} 
 res.render("home",data);
})
app.post("/signup",async (req,res)=>{
  
    const { email} = req.body;
    const user = await collection.findOne({ email });
    
     if(user){
        return res.render("signup",{error: "Email is already used"})
     }
    else{
     const data={
        name:req.body.name,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
        date:req.body.date
     }

   await collection.insertMany([data])
    
   res.render("login", data);
    }
})
app.post("/login", async (req, res) => {

    const { email, password } = req.body;


    if(email == "lukalevidze@yahoo.com" && password == "Luka1964"){
     return res.render("admin");
     }
     
     
    const user = await collection.findOne({ email });
    const data={
      name:user.name,
      lastname:user.lastname,
      email:user.email,
      phone:user.phone,
      password:user.password,
      date:user.date
   }

   
    if (!user) {
      return res.render("login", { error: "Invalid email or password." });
    }
 
    if (user.password !== password) {
      return res.render("login", { error: "Invalid email or password." });
    }
  
    res.render("home",user);
  });
app.post("/profile", async (req,res) => {
  const data = {
      name:req.body.name,
      lastname:req.body.lastname,
      email:req.body.email,
      phone:req.body.phone,
      password:req.body.password,
      date:req.body.date
  }
   res.render("profile",data);
});

app.post('/upload', upload.single('photo'), async (req, res) => {
  const info = {
    photoName: req.file.filename, 
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };
   
  try {
    await productCollection.create(info); 
    res.render('admin', info);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred while uploading the product.');
  }
});  
app.listen(3001,()=>{
    console.log("port Connected")
})