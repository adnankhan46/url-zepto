const jwt = require("jsonwebtoken")
const secret = "Adnan@1234"

function setUser(user){
   const payload = {
    _id: user._id,
    email: user.email,
    role: user.role
   }
   return jwt.sign(payload, secret)
}

function getUser(token){
    if(!token){return null}
    try {
        
        return jwt.verify(token, secret)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    setUser,
    getUser
}