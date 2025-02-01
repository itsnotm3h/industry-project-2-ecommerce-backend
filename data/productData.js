const pool = require('../database');

async function getAllProducts(){
    const [rows] = await pool.query(`SELECT 
            p.product_id,
            p.product_name, 
            p.product_price, 
            p.product_image, 
            p.product_stock, 
            p.product_series, 
            c.category_name 
        FROM 
            products p
        JOIN 
            product_category pc 
        ON 
            p.product_id = pc.product_id
        
        JOIN categories c
        ON 
            c.category_id = pc.category_id`)

    return rows;
}

async function getProductById(id)
{
const [rows] = await pool.query(`SELECT 
    p.product_id, 
            p.product_name, 
            p.product_price, 
            p.product_image, 
            p.product_stock, 
            p.product_series, 
            p.product_description,
            c.category_name
        FROM 
            products p
        JOIN 
            product_category pc 
        ON 
            p.product_id = pc.product_id
        
        JOIN categories c
        ON 
            c.category_id = pc.category_id
       
        WHERE p.product_id = ?`, [id]);


const [dimension] = await pool.query(`SELECT * FROM product_dimension  WHERE product_id = ?`, [id]);

if (rows.length > 0) {
    rows[0].dimension = dimension;  // Add dimension data to the product object
}

  return rows[0];

}


module.exports ={
    getAllProducts,getProductById
};