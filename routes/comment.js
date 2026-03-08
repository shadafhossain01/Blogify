const express=require("express")
const Comment = require("../models/comment")
const auth = require("../middlewares/auth")
const router=express.Router()

router.post("/:id",auth,(req,res)=>{
 const id=req.params.id
 const {content}=req.body
 Comment.create({
   content: content,
   blogId: id,
   createdBy:req.user._id
 });
 res.redirect(`/blog/${id}`)
})

module.exports=router