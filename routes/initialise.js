const express = require('express');
const router = express.Router();
const pool = require('../database');
const sessionService = require('../services/sessionService');


//to set cookie
const cookieParser = require("cookie-parser");
//to encode cookie.
const crypto = require("crypto");


router.post("/init", async (req,res)=>{

    try{

   
        const checkSession = req.cookies.session_id;
        
        if(checkSession==null)
        {

        const sessionId = req.cookies.session_id || crypto.randomBytes(16).toString('hex');   

        res.cookie("session_id", sessionId, {
            // httpOnly: true,
            // secure: process.env.NODE_ENV === 'production' || process.env.LOCAL_URL.includes('gitpod'),  // Allow cookies in both local and production
            // sameSite: 'None',  // Required for cross-origin requests
            httpOnly: true,
            secure: true, // Makes sure the cookie is sent only over HTTPS
            sameSite: 'None', // Required for cross-origin cookies
            maxAge: 24 * 60 * 60 * 1000  // 1-day expiration
          });
        
        let sessionAction = "first_visit";
        
        res.json({message:"Session initialized",sessionId});
        
        await sessionService.setSession(sessionId, sessionAction);
        // console.log(sessionId);
    }
    // console.log("Incoming Cookies:", checkSession); // Log received cookies


    }
    catch (error){
        console.error("Error initializing session:", error);
        res.status(500).json({message: "This error is from routes (intialised.js): " + error.message})
    }
   
})

module.exports = router;