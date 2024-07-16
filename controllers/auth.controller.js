const UserModel = require("../models/user.model")

module.exports.signUp = async (req, res)=> {
const {name, email, birthday, phone, password} = req.body

try {
    const user = await UserModel.create({name, email, birthday, phone, password});
    res.status(201).json({user: user._id})
}
catch (err) {
    res.status(400).send ({err})
}
}