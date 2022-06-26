const router = require("express").Router();
const notifyController = require("../controller/notifyController");
const isopensession = require("../middleweare/authMiddleweare");

router.get("/notifies", isopensession, notifyController.getNotify);
router.post("/notify", isopensession, notifyController.createNotify);
router.patch("/isReadNotify/:id", isopensession, notifyController.isReadNotify);
router.delete("/notify/:id", isopensession, notifyController.removeNotify);

module.exports = router;
