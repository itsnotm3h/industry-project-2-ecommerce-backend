const express = require('express');
const router = express.Router();
const pool = require('../database');
const promoService = require('../services/promoService');

router.get("/:promo_code", async (req,res)=>{
    try{
        const checkSession = req.cookies.session_id;
        const promo = await promoService.getPromo(req.params.promo_code);

        if(checkSession !=null)
        {
            res.json(promo);
        }

    }
    catch(error)
    {
        res.status(404).json({message: "This error is from routes promo (getPromo) :  " + error.message})    }
})

module.exports = router;