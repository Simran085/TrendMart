  // BACKEND
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");    //to generate & verify the token
const multer = require("multer");      //to create image storage system
const path = require("path");
const cors = require("cors");

app.use(express.json()); 
app.use(cors());

//Database Connection with MongoDB
mongoose.connect("mongodb+srv://greatstackdev:sim56code@cluster0.kcnf3yp.mongodb.net/e-commerce");

//API creation
app.get("/",(req, res) => {
    res.send("Express App is Running")
})

//Image Storage Engine (here we have configured the disk storage)
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=> {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating upload Endpoint for images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});


//Create an endpoint- to add the product in MongoDB Atlas 
//Schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type:Boolean,
        default: true,
    },
})

app.post('/addproduct',async(req, res)=> {
    let products = await Product.find({});
    let id;
    if(products.length>0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id= 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

//Creating API for deleting Products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
}) 


// Creating API for getting all products
app.get('/allproducts', async (req, res)=> {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})


//API for user creation:
 // Schema creating for user model
 const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
 })

 
 //Creating endpoint for registering the user
 app.post('/signup', async (req, res) => {
    let check = await Users.findOne({email:req.body.email});
    if(check) {
        return res.status(400).json({success:false,errors:"Existing user found with same Email address"});
    }
    let cart = {};
    for(let i = 0; i< 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password:req.body.password,
        cartData: cart,
    }) 

    await user.save();

    //After saving the details of user, we use the JWT authentication data
    const data = {
        user: {
            id:user.id
        }
    }

    //we create a token
    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true,token})
 })


// creating Endpoint for user login
app.post('/login', async(req,res)=> {
    let user = await Users.findOne({email: req.body.email});
    if(user) {
        const passCompare = req.body.password === user.password;
        if(passCompare) {
           const data = {
                user: {
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true, token});
        }
        else {
            res.json({success:false, errors:"Wrong Password"});
        }
    }
    else {
        res.json({success: false, errors: "Wrong Email Id"})
    }
})

//creating endpoint for newcollectiion data
app.get('/newcollections', async(req,res)=> {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);    //with this, we get recently added 8 products in newcoll.
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

//creating endpoint for popular in women category
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({category: "women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

//creating middleware to fetch user
const fetchUser = async(req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else {
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch(error) {
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
    }
}

//creating endpoint for adding product in cartdata
let cartData = {};
app.post('/addtocart',fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    const { itemId } = req.body;
    const userId = req.user.id; // Assuming the user ID is stored in the token

    console.log({ itemId }, { id: userId });

    // Update cart data
    if (cartData[itemId]) {
        cartData[itemId] += 1;
    } else {
        cartData[itemId] = 1;
    }

     // Find user in MongoDB
    let userData = await Users.findOne({_id:req.user.id});
    if (!userData.cartData[req.body.itemId]) {
        userData.cartData[req.body.itemId] = 0; // Initialize if not present
    }
    userData.cartData[req.body.itemId] += 1;

    // Update the user's cart data in MongoDB
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});

    // Send updated cart data as response
    res.send(userData.cartData);
});


//creating endpoint for removing product in cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    const { itemId } = req.body;
    const userId = req.user.id;

    console.log("removed", itemId);

    try {
        // Find user in MongoDB
        let userData = await Users.findOne({ _id: userId });

        // Check if the item exists in the cart and its quantity is greater than 0
        if (userData.cartData[itemId] && userData.cartData[itemId] > 0) {
            userData.cartData[itemId] -= 1;

            // Optional: Remove the item from cart if quantity reaches 0
            if (userData.cartData[itemId] === 0) {
                delete userData.cartData[itemId];
            }

            // Update the user's cart data in MongoDB
            await Users.findOneAndUpdate({ _id: userId }, { cartData: userData.cartData });

            // Send updated cart data as response
            res.json(userData.cartData);
        } else {
            res.status(400).send({ error: "Item not found in cart or quantity is already 0" });
        }
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});

//creating end point to get cartdata
app.post('/getcart', fetchUser, async (req, res)=> {
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})


app.listen(port, (error)=> {
    if(!error) {
        console.log("Server Running on Port" +port)
    }
    else {
        console.log("Error:" +error)
    }
})
