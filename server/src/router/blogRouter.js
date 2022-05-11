const router = require("express").Router()
const blogcontoller = require("./../controller/Blog_contoller")

const isopensession = require("../middleweare/auth_middleweare");



router.post("/",isopensession,blogcontoller.createPost)

 router.get("/Post/:id",blogcontoller.onearticleget)

router.get("/search",blogcontoller.searchpost)


module.exports=router