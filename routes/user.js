const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');


router.post('/register',async (req,res)=>{
    try{
        const{
            first_name,
            last_name,
            email,
            password,
            dob_day,
            dob_month,
            dob_year,
            marketing_preference
        }= req.body;
        
        const user = await userService.createUser({
            first_name,
            last_name,
            email,
            password,
            dob_day,
            dob_month,
            dob_year,
            marketing_preference
        })

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// can add in cart data when they login. 

router.post("/login", async (req,res)=>{

    try{
        const checkSession = req.cookies.session_id;

        const {email,password} = req.body;
        const user = await userService.loginUser(email,password);
        const token = jwt.sign({userId:user.user_id, userType: user.user_type},process.env.JWT_SECRET, {
            expiresIn:'1h'
        });

        res.cookie('auth_token', token, {
            httpOnly: true, // Prevent JavaScript access to the cookie (mitigates XSS)
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            sameSite: 'Strict', // Prevent CSRF attacks
            maxAge: 3600000, // 1 hour expiration (optional)
          });
    
        res.json({status:"loggedIn"})

    }
    catch(error){
        res.status(401).json({ message: "from Route :"+error.message });
    }

})

router.post("/logout", async (req,res)=>{
    res.clearCookie('auth_token', {
        httpOnly: true, // Prevent JavaScript access to the cookie (mitigates XSS)
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        sameSite: 'Strict', // Prevent CSRF attacks
      });
})

module.exports = router;