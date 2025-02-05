const jwt = require("jsonwebtoken");

function authenticateUser (req,res,next)
{
    const token = req.cookies.auth_token;
    console.log("This is authenticate: "+ token);

    if(!token) return res.status(401).json({message:"Unauthorizes"})


    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status(403).json({message:"Invalid or expired data."});
    }
}

module.exports = authenticateUser
