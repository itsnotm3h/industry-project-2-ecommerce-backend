const cartData = require("../data/cartData");

async function getCart(session_id)
{
    return await cartData.getCart(session_id);
}

async function addToCart(session_id,user_id,cartItems)
{
    if(!Array.isArray(cartItems)) throw new Error("cart item must be an array");
    await cartData.addToCart(session_id,user_id,cartItems);
}

module.exports={
    getCart,
    addToCart
}
