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


const app = express();

const corsOptions = {
  origin: process.env.LOCAL_URL,  // Replace with your frontend URL
  credentials: true,  // Allow cookies to be sent
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api/products', productsRouter);
app.use('/session', cookieRouter);



// Routes
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the API" });
});




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

