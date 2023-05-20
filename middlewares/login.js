const jwt = require('jsonwebtoken');

const login =  (req, res, next)=>{
    
    const token = req.header("Authorization")
    // const tokenValid = jwt.verify(token , process.env.SECRETA)
    try {
        const {email}=jwt.verify(token , process.env.SECRETA)
        req.email = email
        next()  
        
    }
    catch(error){
        next(error)
    }
}


module.exports = login