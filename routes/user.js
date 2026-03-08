const express = require("express");
const multer = require("multer");
const path=require("path")
const { handleSingIn, handleSingUp, handleLogout } = require("../controllers/user");
const Blog = require("../models/blog");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", async(req, res) => {
  const blogs=await Blog.find({})
  res.render("home",{blogs});
});

router.get("/signin", (req, res) => res.render("signIn"));
router.get("/signup", (req, res) => res.render("signUp"));

router.post("/signup", upload.single("image"), handleSingUp);
router.post("/signin", handleSingIn);
router.get("/logout", handleLogout);

module.exports = router;

