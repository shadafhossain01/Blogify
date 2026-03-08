const User=require("../models/user")
const bcrypt=require("bcrypt");
const { generateToken } = require("../utils/token");

const handleSingIn=async(req,res)=>{
    try {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    return res.render("home", { error: true });
  }
  const match = await bcrypt.compare(password, findUser.password);
  if (!match) {
    return res.render("home", { error: true });
  }

  const token = await generateToken({ id: findUser._id });
  res.cookie("token", token);
  res.redirect("/");
} catch (err) {
    res.render("home",{error:true})
}}

const handleSingUp = async (req, res) => {
  const { name, email, password } = req.body;
  const hassPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hassPassword,
    image: req.file ? `/uploads/${req.file.filename}` : "/images/user.jpg",
  });

const token = await generateToken({ id: newUser._id });
  res.cookie("token", token);
  res.redirect("/")
};

const handleLogout=(req,res)=>{
    res.clearCookie("token")
    res.redirect("/")
}

module.exports = { handleSingIn, handleSingUp, handleLogout };