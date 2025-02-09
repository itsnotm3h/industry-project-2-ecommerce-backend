const orderData = require("../data/orderData");

async function createOrder(userId,orderItems){
    return await orderData.createOrder(userId,orderItems);
}

async function getOrderData (orderId){
    return await orderData.getOrderData(orderId);
}

async function updateOrderStatus (orderId, status){
    return await orderData.updateOrderStatus(orderId, status);
}

async function updateOrderSessionId (orderId,sessionId){
    return await orderData.updateOrderSessionId(orderId,sessionId);
}

async function getOrdersByUserId(user_id){
    return await orderData.getOrdersByUserId(user_id);
}

module.exports = {
    createOrder,
    getOrderData,
    getOrdersByUserId,
    updateOrderStatus,
    updateOrderSessionId
}



