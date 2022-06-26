const router = require("express").Router();
const actionController = require("../controller/actionController");
const isopensession = require("../middleweare/authMiddleweare");

router.post("/likes", actionController.getLike);
router.post("/dislikes", actionController.getDislike);

router.post("/upLike", isopensession, actionController.upLike);
router.post("/unLike", isopensession, actionController.unLike);

router.post("/upDislike", isopensession, actionController.upDislike);
router.post("/unDislike", isopensession, actionController.unDislike);

module.exports = router;
