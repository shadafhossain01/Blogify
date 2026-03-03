require("dotenv").config();
const express=require("express")
const path=require("path")
const dbConnect = require("./config/dbConnect");
const userRoute=require("./routes/user")

const app=express()
const PORT = process.env.PORT || 8001;

dbConnect()

app.set("view engine",'ejs')
app.set("views",path.resolve("views"))
app.use(express.static(path.resolve("public")))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", userRoute);

app.listen(PORT,()=>console.log(`Server started at Port ${PORT}`))