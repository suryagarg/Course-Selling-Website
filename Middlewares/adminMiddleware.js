const jwt = require("jsonwebtoken");
const admin = require("../routes/admin");
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

function adminMiddleware(req, res, next){
     try{
        const token = req.headers.token;
        const decode = jwt.verify(token, JWT_ADMIN_PASSWORD)
    
        if(decode){
            req.userId = decode.id;
            next();
        }else{
            res.status(403).json({
                message: "You are not signed in"
            })
        }
     }catch(error){
        console.log("Error Generated", error.message)
        res.status(404).json({
            message: "invalid token"
        })
     }
}

module.exports = {
    adminMiddleware: adminMiddleware
}