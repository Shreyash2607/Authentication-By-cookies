const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;

    //check json web token is present and verified
    if(token){
        jwt.verify(token,'shreyash secret',(err,decodeToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodeToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
    
}

const checkUser = async(req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'shreyash secret',async(err,decodeToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodeToken);
                let user =  await User.findById(decodeToken.id);
                res.locals.user = user;
                next();
            }
        })
    }else{
        res.locals.user=null;
        next();
    }
}

module.exports = {requireAuth,checkUser};