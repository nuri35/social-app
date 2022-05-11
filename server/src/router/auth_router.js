const router = require("express").Router()
const authcontoller = require("./../controller/auth_controller")
const passport = require("passport")

const CLİENT_URL = "http://localhost:3000/"

require("./../controller/password")(passport)




router.post("/login",authcontoller.login)

router.get("/user",authcontoller.getUserInfo)

router.get("/failed",authcontoller.loginFailed)


router.get("/google",passport.authenticate("google",{scope:["email","profile"]})) 

router.get("/google/callback",passport.authenticate("google",{
    successRedirect: CLİENT_URL,
    failureRedirect:"/auth/failed"
}))




router.get("/logout",authcontoller.logout)

router.post("/verify",authcontoller.verifymail)



// router.post("/register",authMiddleweare.isnothavesession,validatormıddleweare.validatenewuser(),authcontoller.register)

router.post("/register",authcontoller.register)

router.post("/forgetPass",authcontoller.forgetPass)

router.post("/resetPassword",authcontoller.resetPassword)

// router.get("/forgetpass",authMiddleweare.isnothavesession,authcontoller.showforgetpass)//sıfremı unuttum kısmı gorunecek 

// router.post("/forgetpass",authMiddleweare.isnothavesession,validatormıddleweare.validateemail(),authcontoller.forgetpass)

// router.get("/resetpassword/:id/:token",authMiddleweare.isnothavesession,authcontoller.resetpass)
// router.get("/resetpassword",authMiddleweare.isnothavesession,authcontoller.resetpass)

// router.post("/resetpassword",authMiddleweare.isnothavesession,validatormıddleweare.validatpass(),authcontoller.resetpassok)

router.get("/logout",authcontoller.logout) 

module.exports=router