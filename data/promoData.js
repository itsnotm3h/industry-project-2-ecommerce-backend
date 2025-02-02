const pool = require("../database");

// promo code schema: promo_code (promo_code, start_date, end_date, promo_limit, promo_type, discount_rate)

async function getPromo(code){

    const [promoCode] = await pool.query(`
        SELECT discount_rate FROM promo_code WHERE end_date > NOW() AND start_date <= NOW() AND promo_limit !=0 AND promo_code = ?`,[code]);

        if(promoCode !="")
            {
                return promoCode[0];
            }   
            else{
                return ;
            }     
}

module.exports ={
    getPromo
};