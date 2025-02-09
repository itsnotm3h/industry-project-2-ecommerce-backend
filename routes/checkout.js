const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const orderService = require('../services/orderService');
const checkoutService = require('../services/checkoutService');
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
        event = stripe.webhooks.constructEvent(req.body.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log(event);
    } catch (error) {
        console.error(`Webhook Error: ${error.message}`);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Handle the event based on its type
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Checkout session completed!', session);
            if (session.metadata && session.metadata.orderId) {
                await orderService.updateOrderStatus(session.metadata.orderId, 'processing');
            }
            break;

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a success response
    res.json({ received: true });
});

// so this is what we can use to detect what kind of payment is being made. 
// router.post('/webhook', express.raw({ type: 'application/json' }), async (req,res)=>{


//     let event;
//     try{
//         const sig = req.headers['stripe-signature'];
//         event = stripe.webhooks.constructEvent(req.body.toString(),sig,process.env.STRIPE_WEBHOOK_SECRET);
//     } catch(error){
//         console.error(`Webhook Error: ${error.message}`);
//         return res.status(400).send(`webhook Error: ${error.message}`);
//     }

//     switch(event.type)
//     {
//         case 'checkout.session.completed':
//             const session = event.data.object;
//             console.log('Checkout session completed!',session);
//             if(session_metadata && session.metadata.orderId)
//             {
//                 await orderService.updateOrderStatus(session.metadata.orderId,'processing')
//             }
//             break;
        
//         default:
//             console.log(`unhandled event type: ${event.type}`);
//     }
    
//     res.json({ received: true });
// })


module.exports = router;