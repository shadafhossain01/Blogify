const User=require("../models/user")
const bcrypt=require("bcrypt");
const { generateToken } = require("../utils/token");


const handleSingIn=async(req,res)=>{
    try {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    return res.redirect("/");
  }
  const match = await bcrypt.compare(password, findUser.passwordHash);
  if (!match) {
    return res.redirect("/");
  }

  const token = await generateToken(findUser);
  res.cookie("token", token);
  res.redirect("/");
} catch (err) {
    res.render("home",{error:true})
}}

const handleSingUp = async (req, res) => {
  const { name, email, password, image } = req.body;
  const hassPassword = await bcrypt.hash(password, 10);
  const user = {
    name,
    email,
    hassPassword,
  };
  const token = await generateToken(user);
  res.cookie("token", token);
  User.create({ name, email, password: hassPassword, image });
};

const handleLogout=(req,res)=>{
    res.clearCookie("token")
}

module.exports = { handleSingIn, handleSingUp, handleLogout };