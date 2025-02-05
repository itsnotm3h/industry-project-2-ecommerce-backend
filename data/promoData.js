const pool = require("../database");

// promo code schema: promo_code (promo_code, start_date, end_date, promo_limit, promo_type, discount_rate)

async function getPromo(code){

    const [promoCode] = await pool.query(`
        SELECT discount_rate FROM promo_code WHERE end_date > NOW() AND start_date <= NOW() AND promo_limit !=0 AND promo_code = ?`,[code]);

           // Check if promoCode is an empty array
    if (promoCode.length > 0) {
        return promoCode[0];  // Return the first promo code object
    } else {
        return 0;  // Return 0 if no promo code was found
    } 
}

module.exports ={
    getPromo
    
};