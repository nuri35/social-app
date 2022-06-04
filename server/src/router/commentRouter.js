const router = require("express").Router()
const commentController = require("../controller/commentController")
const isopensession = require("../middleweare/authMiddleweare");

router.post("/comment",isopensession,commentController.commentAdd)

router.post("/getComments",commentController.getComments)

router.put("/comment",isopensession,commentController.editSave)

router.delete("/comment/:id",commentController.deleteComment)

module.exports=router