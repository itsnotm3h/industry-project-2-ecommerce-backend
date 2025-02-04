const pool = require('../database');

async function getCart(session_id) {

    try{

        const [rows] = await pool.query(`SELECT 
            c.product_qty,
            c.product_id, 
            p.product_name, 
            p.product_price, 
            p.product_image, 
            p.product_series,
            p.product_stock,  
            a.category_name
            
            FROM 
                cart c
            JOIN 
                products p 
            ON 
                c.product_id = p.product_id
            JOIN 
                product_category pc 
            ON 
                pc.product_id = p.product_id
            JOIN 
                categories a
            ON 
                a.category_id = pc.category_id
            WHERE 
                c.public_session_id = ?`, 
            [session_id]
        );
    
        const [dimension] = await pool.query(`SELECT * FROM product_dimension`);
    
    
        for (let item of rows) {
            const currentIndex = dimension.findIndex(i => i.product_id === item.product_id);
            if (currentIndex !== -1) {
    
                const currentDimension = dimension[currentIndex]; // Correct lookup
    
    
                let fullString = "";
    
                if (currentDimension.pd_height != null) {
                    fullString += `${currentDimension.pd_height}cm(H)`;
                }
                if (currentDimension.pd_width != null) {
                    fullString += ` x ${currentDimension.pd_width}cm(W)`;
                }
                if (currentDimension.pd_depth != null) {
                    fullString += ` x ${currentDimension.pd_depth}cm(D)`;
                }
                if (currentDimension.pd_diameter != null || currentDimension.pd_circumference != null) {
                    if (currentDimension.pd_diameter != null) {
                        fullString += `, ${currentDimension.pd_diameter}cm(Diameter)`;
                    }
                    if (currentDimension.pd_circumference != null) {
                        fullString += `, ${currentDimension.pd_circumference}cm(Circumference)`;
                    }
                }
    
                item.dimension = fullString; // Correctly assign to `item`
            }
        }

        return rows
        
    } catch (error)
    {
        console.log(error.message);
    }

    console.log(rows[0]);


}
        
        

async function addToCart(session_id,user_id, cartItems) {

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        
        await connection.query(`DELETE FROM cart WHERE public_session_id =?`, [session_id]);

        for(const item of cartItems)
        {
            await connection.query(`INSERT INTO cart (public_session_id,user_id,product_id,product_qty) VALUES(?,?,?,?)`,[session_id,user_id,item.product_id,item.product_qty])
        }

        await connection.commit();

    }
    catch(error)
    {
        console.log(error.message);
        await connection.rollback();
    } finally{
        connection.release();
    }

}

module.exports={
    getCart,addToCart,
}