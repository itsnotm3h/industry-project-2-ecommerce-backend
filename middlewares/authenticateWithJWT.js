const jwt = require("jsonwebtoken");

function authenticateUser (req,res,next)
{
    // const authHeader = req.headers['authorization'];
    // if(!authHeader || !authHeader.startsWith(`Bearer `))
    // {
    //     return res.status(401).json({message:"Authorization Header is missing. "})
    // }

    // const token = authHeader(' ')[1];

    const token = req.cookies.auth_token;

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
