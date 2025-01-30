const express = require('express');
const router = express.Router();
const pool = require('../database');
const sessionService = require('../services/sessionService');


//to set cookie
const cookieParser = require("cookie-parser");
//to encode cookie.
const crypto = require("crypto");


router.put("/init", async (req,res)=>{

    try{
        const sessionId = req.cookies.session || crypto.randomBytes(16).toString('hex');

        const secureCookie = process.env.NODE_ENV === 'production';


        res.cookie("session_id", sessionId,{
            httpOnly:true,
            secure:secureCookie,
            sameSite:"strict",
            maxAge:24*60*60*1000,
        });
        
        let sessionAction = "first_visit";
        
        await sessionService.setSession(sessionId, sessionAction);
        res.json({message:"Session initialized"});
    }
    catch (error){
        console.error("Error initializing session:", error);

        res.status(500).json({message: "This error is from routes (intialised.js): " + error.message})
    }
   
})

module.exports = router;