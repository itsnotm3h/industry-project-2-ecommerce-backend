const express = require('express');
const cors = require('cors');
require('dotenv').config();

//to set cookie
const cookieParser = require("cookie-parser");

//this is to make the connection asychronous.
const pool = require('./database');



//This is to set up the router:
const productsRouter = require("./routes/product");
const cookieRouter = require("./routes/initialise");
const promoRouter = require("./routes/promo");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes/checkout");



const app = express();

const corsOptions = {
  origin: [process.env.LOCAL_URL, process.env.URL],   // Reference the environment variable
  credentials: true,  // Allow cookies to be sent
  allowedHeaders: ["Content-Type", "Authorization", "Stripe-Signature"],// Ensure headers are allowed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

// Middleware
app.use(cors(corsOptions));
// app.use(express.json());
app.use(cookieParser());
app.use('/api/products', productsRouter);
app.use('/session', cookieRouter);
app.use('/promo', promoRouter);
app.use('/api/users',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/checkout',checkoutRouter);


// Routes
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the API" });
});




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

