const pool = require('../database');

async function getUserEmail(email)
{
    if(!email ||  typeof email !=="string") throw error("invalid Email")
    
        const [rows] = await pool.query("SELECT * FROM users WHERE email=?",[email]);
        return rows[0];
}

async function getUserById(id)
{
    if(!id|| typeof id !=='number') throw error("invalid id");

    const [rows] = await pool.query("SELECT * FROM users WHERE user_id=?",[id]);
    return rows[0]
}

async function createUser({first_name,last_name,email,password,dob,marketing_preference,user_type}){

    const connection = await pool.getConnection();
    
    try{
        await connection.query("INSERT INTO users (first_name,last_name,email,password,dob,marketing_preference,user_type) VALUES (?,?,?,?,?,?,?)",[first_name,last_name,email,password,dob,marketing_preference,user_type]);
        await connection.commit();

    } catch (error)
    {
        await connection.rollback();
        console.error("Error during creation (userData):", error);
        throw error;
        
    } finally {
        connection.release();
    }

};


async function updateUserCart(session_id)
{
    try
    {
        const [rows] = await pool.query(`DELETE FROM public_session_log WHERE public_session_id =?`, [session_id]);
        console.log(rows);

        if(rows.affectedRows > 0)
        {
            return {success:true, message:"Cart updated"}
        }
        else{
            return {success:true,message:"No session found"}
        }
        
    } catch(error)
    {
        console.error("Error from data (UserData): " , error);
        return {success:false,message:"Error"}

    }

}

module.exports = {
    createUser,
    getUserById,
    getUserEmail,
    updateUserCart
}