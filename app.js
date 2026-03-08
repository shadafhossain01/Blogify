require("dotenv").config();
const express=require("express")
const path=require("path")
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const userRoute=require("./routes/user");
const blogRoute=require("./routes/blog");
const commentRoute=require("./routes/comment");
const User = require("./models/user");
const { verifyToken } = require("./utils/token");

const app=express()
const PORT = process.env.PORT || 8001;

dbConnect()

app.set("view engine",'ejs')
app.set("views",path.resolve("views"))
app.use(express.static(path.resolve("public")))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  try {
    const decoded = await verifyToken(token);
    const user = await User.findById(decoded.id);
    req.user = user;
    res.locals.user = user;
  } catch (err) {
    res.locals.user = null;
  }

  next();
});

app.use("/", userRoute);
app.use("/blog", blogRoute);
app.use("/comment", commentRoute);

app.listen(PORT,()=>console.log(`Server started at Port ${PORT}`))