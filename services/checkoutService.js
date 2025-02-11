const cartService = require('./cartService');
const orderService = require('./orderService');
const stripeService = require('./stripeService');

async function checkout(session_id, userId)
{
    // console.log("This is inside checkout Service")
    const orderItems = await cartService.getCart(session_id, userId);
    // console.log("This is orderItems:", orderItems)


    // At this point will need a condition to determine if we still have products in stock to checkout,
    //IF YES continue down. 
    //IF NO send back error to the website to say unable to checkout and adjust the qty for the product to checkout. 
     


    const orderId = await orderService.createOrder(userId,orderItems);
    // console.log("This is orderId:", orderId)

    const session = await stripeService.createCheckoutSession(userId,orderItems,orderId,session_id);

    await orderService.updateOrderSessionId(orderId,session.id);
    //if successfull will need to delete the entry.

    return session;


}

module.exports = {
    checkout
}
