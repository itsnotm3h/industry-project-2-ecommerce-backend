const pool = require("../database");

async function getOrdersByUserId(user_id)
{
    const [rows] = await pool.query("SELECT * FROM orders WHERE user_id =?",[user_id]);

    return rows;
}

// order_items Schema:
// id INT AUTO_INCREMENT PRIMARY KEY,
// order_id INT NOT NULL,
// product_id INT UNSIGNED NOT NULL,
// quantity INT NOT NULL DEFAULT 1,
// FOREIGN KEY (order_id) REFERENCES orders(id),
// FOREIGN KEY (product_id) REFERENCES products(product_id)

async function createOrder(userId, orderItems)
{
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();

        const orderTotal = orderItems.reduce((sum, item) => sum + item.product_price*item.product_qty,0);
        const [orderAdd] = await connection.query(`INSERT INTO orders (user_id, total) VALUES (?,?)`, [userId,orderTotal]);
        const orderId = orderAdd.insertId;

        for(const item of orderItems)
        {
            await connection.query(`INSERT into order_items (order_id,product_id,quantity) VALUES(?,?,?)`,[orderId,item.product_id,item.product_qty]);
        }
        await connection.commit();
        return orderId;
    } catch(error)
    {
        await connection.rollback();
        throw new Error(error.message)
    } finally{
        connection.release();
    }
}

async function getOrderData (orderId){
    const [rows] = await pool.query(`
        SELECT o.product_id, 
        p.product_name, 
        p.product_price,
        o.quantity
        FROM order_items o
        JOIN p product ON o.product_id = p.product_id
        WHERE o_order_id = ?
        `, [orderId]);

        return rows;
}

async function updateOrderStatus (orderId, status)
{
    if(!['created','processing','completed','cancelled'].includes(status))
    {
        throw new Error("invalid status")
    }
    await pool.query('UPDATE orders SET status = ? WHERE id = ?',[status, orderId]);
}

async function updateOrderSessionId (orderId,sessionId)
{
    await pool.query('UPDATE orders SET checkout_session_id = ? WHERE id= ?',[sessionId,orderId])
}

module.exports = {
    createOrder,
    getOrderData,
    getOrdersByUserId,
    updateOrderStatus,
    updateOrderSessionId
}