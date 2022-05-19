const router = require("express").Router()
const commentController = require("./../controller/commentController")
const isopensession = require("../middleweare/auth_middleweare");

router.post("/save",isopensession,commentController.commentAdd)

router.post("/getComments",commentController.getComments)

router.put("/editSave",isopensession,commentController.editSave)

router.delete("/delete/:id",commentController.deleteComment)

module.exports=router