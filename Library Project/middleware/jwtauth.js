const jwt = require('jsonwebtoken');
const secretKey = "idhar.kya.dekh.raha.hai";
class JWTFun{
static genJwt =(data)=>{
    let token = jwt.sign({UserId:data}, "secretKey");
    return token;
}
 static checkAuth = (req,res,next)=>{
    let token = req.cookies.jwt
    if(token){
    let decode = jwt.verify(`${token}`,"secretKey");
                    console.log(decode.UserId);
                    req.user = decode;        
    }
    else{
        return res.json({"message": "token not valid"});
    }
    next() ;
 }
}

module.exports= JWTFun;