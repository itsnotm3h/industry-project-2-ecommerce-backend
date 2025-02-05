const pool = require('../database');

// Schema
// public_session_id VARCHAR(255) UNIQUE PRIMARY KEY,
// created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
// updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
// user_id INT UNSIGNED NULL,
// user_action VARCHAR(255) NOT NULL

async function setSession(public_session_id,user_action)
{
    const connection = await pool.getConnection();

    console.log("public_session_id", public_session_id)

    try{
        await connection.beginTransaction();

          await connection.query(`INSERT INTO public_session_log (public_session_id,user_id,user_action) VALUES (?,?,?)`,[public_session_id,null,user_action]);

        await connection.commit();

    } catch (error) {
      await connection.rollback();
      console.error('Error during Session:', error);
      throw error;
    } finally {
      connection.release();
    }

}

module.exports = {
    setSession
  };