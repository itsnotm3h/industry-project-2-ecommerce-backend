const cartData = require("../data/cartData");

async function getCart(session_id,user_id)
{
    if(user_id != null)return await cartData.getCart_user(session_id,user_id);
    if(user_id == null)return await cartData.getCart(session_id);
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
