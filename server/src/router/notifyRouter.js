const router = require("express").Router()
 const notifyController = require("../controller/notifyController")



router.get("/notifies",notifyController.getNotify)
router.post("/createNotify",notifyController.createNotify)
router.patch("/isReadNotify/:id",notifyController.isReadNotify)
router.delete('/removeNotify/:id', notifyController.removeNotify)



module.exports=router