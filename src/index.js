const express = require('express')
const multer = require("multer")
const app = express()
const path=require("path")
const async = require('hbs/lib/async')
const { User, Product } = require("./database");


const tempelatePath = path.join(__dirname,'../tempelates')


app.use(express.json())
app.set("view engine","ejs")
app.set("views",tempelatePath)
app.use(express.urlencoded({extended:false}))
app.use('/uploads', express.static('uploads'));
app.get("/", (req,res)=>{
  res.render("login", { error: null })
})
app.get("/signup", (req,res)=>{
    res.render("signup", { error: null })
})
//Passing data for edit
app.get("/edit_product/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await productCollection.findOne({ _id: new ObjectId(productId) });
    const info = {
      _id:product._id,
      name: product.name,
      description: product.description,
      price: product.price
    };
    res.render("edit_product", { info });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});
//Passing da data for profile
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
//Sign up
app.post('/signup', async (req, res) => {
  try {
      const existingUser = await User.findOne({ where: { email: req.body.email } });
      const error_msg = "Invalid email or password";
      if (existingUser) {
          const error_msg = "Email is already used";
          return res.render("signup", { error: error_msg });
      } else {
          const newUser = await User.create({
              name: req.body.name,
              lastname: req.body.lastname,
              email: req.body.email,
              phone: req.body.phone,
              password: req.body.password,
              date: req.body.date
          });

          res.render("login", newUser, {error: error_msg});
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred.');
  }
});

//Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render("login", { error: "Invalid email or password." });
    }

    if (user.password === password) {
      if (user.email === "lukalevidze@yahoo.com" && user.password === "Luka1964") {
        try {
          const products = await Product.findAll();
          return res.render('admin', { products });
        } catch (error) {
          console.error('Error:', error);
          return res.status(500).send('An error occurred.');
        }
      }
      const data = {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        password: user.password,
        date: user.date
      };

      return res.render("home", data);
    } else {
      return res.render("login", { error: "Invalid email or password." });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('An error occurred.');
  }
});

//User profile
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

//Product image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, originalName);
  }
  
});

const upload = multer({ storage: storage });
//product upload
app.post("/upload", upload.single("photo"), async (req, res) => {
  const info = {
    ID:req.body.ID,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    photo: req.file.originalname 
  };

  await productCollection.insertMany([info]);

  try {
    const products = await productCollection.find({}).exec();
    res.render('admin', { products });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});
//edit
app.post("/update", async (req, res) => {
  const productId =req.body.id
  console.log(productId);
  const updatedData = {
    name: req.body.editName, 
    description: req.body.editDescription, 
    price: req.body.editPrice  
  };

  try {
    await productCollection.updateOne(
      { _id: productId }, 
      { $set: updatedData }
    ); 
    const products = await productCollection.find({}).exec();
    res.render("admin", { products });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});


app.listen(3001,()=>{
    console.log("prot Connected")
})