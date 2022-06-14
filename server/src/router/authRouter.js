const router = require("express").Router();
const authcontoller = require("./../controller/authController");
const passport = require("passport");

require("../controller/password")(passport);

router.post("/login", authcontoller.login);

router.get("/auth", authcontoller.getUserInfo);

router.get("/failed", authcontoller.loginFailed);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect:
      process.env.NODE_ENV === "development"
        ? `${process.env.WEB_SITE_URL_DEV}`
        : `${process.env.WEB_SITE_URL}`,
    failureRedirect: "/auth/failed",
  })
);

router.post("/verify", authcontoller.verifymail);

router.post("/register", authcontoller.register);

router.post("/forgetPass", authcontoller.forgetPass);

router.post("/resetPassword", authcontoller.resetPassword);

router.get("/logout", authcontoller.logout);

module.exports = router;
