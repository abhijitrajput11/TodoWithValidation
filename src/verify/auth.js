const jwt = require('jsonwebtoken')
const register = require("../models/register")

const auth = async(req,res,next)=>{
    try{
        const token = req.coolies.jwt;
        const verify = jwt.verify(token,"iamabhijitrajputandiamawebdeveloper")
        const user = register.findOne({_id:verify._id})
        next();
    }
    catch (e){
        res.status(401).send(e)
    }
}
module.exports = auth