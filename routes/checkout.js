const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const orderService = require('../services/orderService');
const checkoutService = require('../services/checkoutService');
const cartService = require('../services/cartService');
const authenticate = require('../middlewares/authenticateWithJWT');


router.post("/", authenticate, async (req,res)=>{

    try{
        const session_id = req.cookies.session_id;
        const session = await checkoutService.checkout(session_id, req.userId);
        res.json(session.url);
    } catch (error)
    {
        res.status(500).json({message:"Error in checkoutPost " + error.message})
    }
})

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    let event;

    try {
        // Stripe requires the raw body to be passed for signature verification
        const sig = req.headers['stripe-signature'];

        // console.log("This sig: ",sig)

        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        // console.log(event);
    } catch (error) {
        console.error(`Webhook Error: ${error.message}`);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Handle the event based on its type
    switch (event.type) {

        case 'payment_intent.succeeded':
            const paymentSucceed = event.data.object;
            console.log('Checkout payment completed', paymentSucceed);
            if(paymentSucceed.metadata && paymentSucceed.metadata.orderId)
            {
                await orderService.updateOrderStatus(paymentSucceed.metadata.orderId, 'pending_shipping');
                //Update the stock in product.
                //check the number of the stock.
            }
            break;

        case 'payment_intent.failed':
            const paymentFail = event.data.object;
            console.log('Checkout payment failed', paymentFail);
            if(paymentFail.metadata && paymentFail.metadata.orderId)
            {
                await orderService.updateOrderStatus(paymentFail.metadata.orderId, 'payment_fail');
                //Do i hold the stock here? 

            }
            break;        

        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Checkout session completed!', session);
            if (session.metadata && session.metadata.public_session_id && session.metadata.userId ) {
                // remove item from cart data. As this is just from the public session cart.
                await cartService.deleteCartItems(session.metadata.userId,session.metadata.public_session_id);
            }
            break;

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a success response
    res.json({ received: true });
});


module.exports = router;