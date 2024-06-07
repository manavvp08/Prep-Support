const jwt = require("jsonwebtoken");
module.exports = (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodetoken = jwt.verify(token,process.env.SECRET_KEy);
        const userId = decodetoken.userId;
        req.body.userId = userId
        next()
    } catch (error) {
        return res.status(409).send({
            message:"You are not authorized",
            success:false
        })
    }
    
}
