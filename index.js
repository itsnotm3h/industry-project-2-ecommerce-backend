const express = require('express');
const cors = require('cors');
require('dotenv').config();

//this is to make the connection asychronous.
const pool = require('./database');



//This is to set up the router:
const productsRouter = require("./routes/product");


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/products', productsRouter);

// Routes
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

