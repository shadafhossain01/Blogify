var jwt = require("jsonwebtoken");

const generateToken = async (data) => {
    const token =await jwt.sign({ ...data }, process.env.JWT_SECRET);
    return token
};

const verifyToken=async(token)=>{
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded
}


module.exports = { generateToken, verifyToken };