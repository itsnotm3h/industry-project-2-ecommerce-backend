const express = require('express');
const router = express.Router();
const pool = require('../database');
const cartService = require('../services/cartService');
const authenticateToken = require('../middlewares/authenticateWithJWT');


router.get("/", async (req, res) => {
    try {
        const session_id = req.cookies.session_id;
        const user_id = req.userId;
        const cart = await cartService.getCart(session_id,user_id);
        console.log(cart);
        res.json(cart);

    } catch (error) {
        res.status(500).json({ message: "Error from route cart: " + error.message })
    }
});

router.get("/loggedIn",  authenticateToken, async (req, res) => {
    try {
        const session_id = req.cookies.session_id;
        const user_id = req.userId;
        const cart = await cartService.getCart(session_id,user_id);
        console.log(cart);
        res.json(cart);

    } catch (error) {
        res.status(500).json({ message: "Error from route cart: " + error.message })
    }
});



router.post("/", async (req, res) => {
    try {
        const cartItems = req.body.cartItems;
        const session_id = req.cookies.session_id;
        // console.log(cartItems);
        // console.log(session_id);
        await cartService.addToCart(session_id, null, cartItems);
        res.json({ message: 'cart updated' })
    } catch (error) {
        res.status(400).json({ message: "Error from route cart: " + error.message })
    }
})

router.post("/loggedIn", authenticateToken, async (req, res) => {
    try {
        const cartItems = req.body.cartItems;
        const session_id = req.cookies.session_id;
        const user_id = req.userId;
        await cartService.addToCart(session_id, user_id, cartItems);

        res.json({ message: 'cart updated' });
    } catch (error) {
        res.status(400).json({ message: "Error from route cart: " + error.message })
    }
})

module.exports = router;