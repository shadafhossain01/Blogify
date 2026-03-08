const auth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/signup");
  }
  next();
};


module.exports=auth