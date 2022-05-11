const router = require("express").Router()
 const actionController = require("../controller/action_controller")



router.post("/getLikes",actionController.getLike)
router.post("/getDislikes",actionController.getDislike)

router.post("/upLike",actionController.upLike)
router.post("/unLike",actionController.unLike)

router.post("/upDislike",actionController.upDislike)
router.post("/unDislike",actionController.unDislike)

module.exports=router