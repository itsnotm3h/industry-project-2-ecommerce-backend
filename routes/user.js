const express = require('express');
const router = express.Router();
const userService = require('../services/userService');


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

module.exports = router;