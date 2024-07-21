const UserModel = require("../models/user.model")
const { signUpErrors, signInErrors } = require('../utils/error.utils');
const jwt = require ("jsonwebtoken")
const maxAge = 3*24*60*60*1000;
const createToken =(id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn : maxAge
    })
};
//register
module.exports.signUp = async (req, res)=> {
const {name, email, birthday, phone, password} = req.body

try {
    const user = await UserModel.create({name, email, birthday, phone, password});
    res.status(201).json({user: user._id})
}
catch (err) {
    const errors = signUpErrors(err);
    res.status(400).send({ errors})
}
}

//to log in

module.exports.signIn = async(req,res)=> {
    const {email, password} = req.body
    try{
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge})
        res.status(200).json({user: user._id})
    }
    catch(err) {
        const errors = signInErrors(err);
        res.status(200).json({ errors });
    }
    
}

//Sign out
module.exports.logout = async(req,res)=> {
    res.cookie("jwt", '', {maxAge:1});
    res.redirect('/')

}