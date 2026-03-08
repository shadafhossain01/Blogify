const express = require("express");
const Blog = require("../models/blog");
const auth = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const Comment = require("../models/comment");
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

router.get("/addBlog", auth, (req,res)=>res.render("addBlog"))

router.post("/addBlog", upload.single("coverImage"), (req, res) => {
  const { title, body } = req.body;
  Blog.create({
    title,
    body,
    coverImage: req.file ? `/uploads/${req.file.filename}` : "/images/blog.jpg",
    createdBy: req.user._id,
  });
  res.redirect("/");
});

router.get("/:id", async(req, res) => {
    const id=req.params.id
    const blog = await Blog.findById(id).populate("createdBy");
    const comments = await Comment.find({ blogId: id }).populate(
      "createdBy",
    );
    res.render("singleBlog", { blog,comments, success: req.query.login === "success" });
});

module.exports = router;
