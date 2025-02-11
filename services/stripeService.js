const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function createLineItems(orderItems)
{
    //1. based on the date we have, we need to reogranise the data into stripe requirements. 
    const lineItems = orderItems.map(item=>({
        price_data:{
            currency:'sgd',
            product_data:{
                name: item.product_name,
                metadata: {
                    product_id: item.product_id
                }
            },
            unit_amount:Math.round(item.product_price*100)
        },
        quantity:item.product_qty
    }));

    console.log(lineItems);

return lineItems;
}

async function createCheckoutSession(userId,orderItems,orderId,publicId)
{
    const lineItems = createLineItems(orderItems);
    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items: lineItems,
        mode:'payment',
        success_url:`http://localhost:5173/`,
        cancel_url:'http://localhost:5173/cart',
        metadata:{
            userId:userId,
            orderId:orderId,
            public_session_id:publicId
        },
        payment_intent_data: {
            metadata: {  
                userId:userId,
                orderId:orderId,
                public_session_id:publicId 
            }
        }
    })

    return session;

}

module.exports= {createCheckoutSession}