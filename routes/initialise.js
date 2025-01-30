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
        const sessionId = req.cookies.session_id || crypto.randomBytes(16).toString('hex');;        

        res.cookie("session_id", sessionId, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:"none",
            maxAge: 24 * 60 * 60 * 1000
          });
        
        let sessionAction = "first_visit";
        
        res.json({message:"Session initialized",sessionId});

        if(sessionId)
        {
            await sessionService.setSession(sessionId, sessionAction);
        }

    }
    catch (error){
        console.error("Error initializing session:", error);

        res.status(500).json({message: "This error is from routes (intialised.js): " + error.message})
    }
   
})

module.exports = router;