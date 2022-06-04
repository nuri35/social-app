const router = require("express").Router()
 const notifyController = require("../controller/notifyController")



router.get("/notifies",notifyController.getNotify)
router.post("/notify",notifyController.createNotify)
router.patch("/isReadNotify/:id",notifyController.isReadNotify)
router.delete('/notify/:id', notifyController.removeNotify)



module.exports=router