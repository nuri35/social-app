const router = require("express").Router()
 const notifyController = require("../controller/notifyController")



router.get("/notifies",notifyController.getNotify)
router.post("/createNotify",notifyController.getNotify)


module.exports=router