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
        console.log(checkSession);
        
        if(checkSession==null)
        {

        const sessionId = req.cookies.session_id || crypto.randomBytes(16).toString('hex');   

        res.cookie("session_id", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only true in production (use HTTPS)
            sameSite: 'lax', // Needed for cross-origin cookies
            maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
          });
        
        let sessionAction = "first_visit";
        
        res.json({message:"Session initialized",sessionId});
        
        await sessionService.setSession(sessionId, sessionAction);
        // console.log(sessionId);
    }
    else{
        res.json({message:"Session initialized",checkSession});
    }

    // console.log("Incoming Cookies:", checkSession); // Log received cookies


    }
    catch (error){
        console.error("Error initializing session:", error);
        res.status(500).json({message: "This error is from routes (intialised.js): " + error.message})
    }
   
})

router.get("/", async (req,res)=>{

        const checkAuth = req.cookies.auth_token;
        const checkSession = req.cookies.session_id;
        

        if(checkAuth && checkSession)
            {
                let sessionAction = "Logged_In";
                await sessionService.setSession(checkSession, sessionAction);
                res.json("loggedIn");

            }
            else{
                res.json("");
            }

});


module.exports = router;