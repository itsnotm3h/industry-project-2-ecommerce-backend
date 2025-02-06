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

async function createOrder(user_id, order_items)
{
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction;

        const orderTotal = order_items.reduce((sum, item) => sum + item.product_price*item.product_qty);
        const orderAdd = await connection.query(`INSERT INTO orders (user_id, total) VALUES (?,?)`, [user_id,orderTotal]);
        const orderId = orderAdd.insertId;

        for(const item of order_items)
        {
            await connection.query(`INSERT into order_items (order_id,product_id,quantity) VALUES(?,?,?)`,[orderId,item.product_id,item.product_qty]);
        }
        await connection.commit();
        return orderId;
    } catch(error)
    {
        await connection.rollback();
    } finally{
        connection.release();
    }
}