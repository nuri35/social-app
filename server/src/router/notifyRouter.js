const router = require("express").Router();
const notifyController = require("../controller/notifyController");
const isopensession = require("../middleweare/authMiddleweare");

router.get("/notifies", isopensession, notifyController.getNotify);
router.post("/notify", isopensession, notifyController.createNotify);
router.patch("/isReadNotify/:id", notifyController.isReadNotify);
router.delete("/notify/:id", notifyController.removeNotify);

module.exports = router;
