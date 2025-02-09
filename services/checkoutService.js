const cartService = require('./cartService');
const orderService = require('./orderService');
const stripeService = require('./stripeService');

async function checkout(session_id, userId)
{
    // console.log("This is inside checkout Service")
    const orderItems = await cartService.getCart(session_id, userId);
    // console.log("This is orderItems:", orderItems)
    const orderId = await orderService.createOrder(userId,orderItems);
    // console.log("This is orderId:", orderId)

    const session = await stripeService.createCheckoutSession(userId,orderItems,orderId);

    await orderService.updateOrderSessionId(orderId,session.id);
    //if successfull will need to delete the entry.

    return session;


}

module.exports = {
    checkout
}
