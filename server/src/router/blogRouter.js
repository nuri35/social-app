const router = require("express").Router()
const blogcontoller = require("./../controller/BlogController")

const isopensession = require("../middleweare/authMiddleweare");


router.post("/post",isopensession,blogcontoller.createPost) 

 router.get("/post/:id",blogcontoller.onearticleget)

router.get("/search",blogcontoller.searchpost)


module.exports=router