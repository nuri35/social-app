const router = require("express").Router();
const actionController = require("../controller/actionController");

router.post("/likes", actionController.getLike);
router.post("/dislikes", actionController.getDislike);

router.post("/upLike", actionController.upLike);
router.post("/unLike", actionController.unLike);

router.post("/upDislike", actionController.upDislike);
router.post("/unDislike", actionController.unDislike);

module.exports = router;
