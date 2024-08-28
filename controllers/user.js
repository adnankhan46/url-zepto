const { v4: uuidv4 } = require('uuid');
const User = require("../model/user");
const {setUser,getUser} = require("../service/auth")

async function handleUserSignUp(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/")
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user){ return res.render("login", {
        error: "Invalid UserName or Password"
    })};


    
     const token = setUser(user); // using Response to send Token
      res.cookie("token", token)  // making cookie to send token
    return res.redirect("/");

}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}
