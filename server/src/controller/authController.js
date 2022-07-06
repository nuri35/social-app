const User = require("./../models/user_models");

const sendEmail = require("./sendMail");
const passwordEmail = require("./passwordEmail");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const passport = require("passport");
require("./password")(passport);

const login = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return res.json({
        message: error,
      });
    }

    req.logIn(user, function (err, data) {
      if (err) {
        console.log(err);
      }

      res.status(200).json({ user, isAuthenticated: true });
    });
  })(req, res, next);
};

const getUserInfo = async (req, res, next) => {
  const data = req.user;
  const isAuthInfo = req.isAuthenticated();
  res.json({ data, isAuthInfo });
};

const loginFailed = (req, res, next) => {
  res.status(400).json({ success: false, message: "Failure" });
};

const verifymail = async (req, res, next) => {
  const token = req.body.activation_token;

  if (token) {
    try {
      const verifyI = await jwt.verify(
        token,
        process.env.CONFIRM_MAIL_JWT_SECRET
      );

      if (!verifyI) {
        res.json({ message: "token incorrect or expired" });
      } else {
        const tokenıd = verifyI.id;

        const userTrueControl = await User.findOne({
          "local.email": verifyI.mail,
        });

        if (!userTrueControl.local.emailactive) {
          const sonuc = await User.findByIdAndUpdate(tokenıd, {
            "local.emailactive": true,
          });

          if (sonuc) {
            res.json({ message: "Email has been successfully activated." });
          } else {
            res.json({ message: "Incorrect user " });
          }
        } else {
          res.json({ message: "Alreday user was actived" });
        }
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  } else {
    res.json({ message: "no tokens" });
  }
};

const createActivationToken = (payload) => {
  const jwtınfos = {
    id: payload.id,
    mail: payload.local.email,
  };

  const jwtoken = jwt.sign(jwtınfos, process.env.CONFIRM_MAIL_JWT_SECRET, {
    expiresIn: "2m",
  });

  return jwtoken;
};

const generateAccessToken = (payload) => {
  const jwtınfos = {
    id: payload.id,
    mail: payload.local.email,
    time: new Date().getTime(),
  };

  return jwt.sign(jwtınfos, process.env.RESET_PASSWORD_JWT_SECRET, {
    expiresIn: "2m",
  });
};

const register = async (req, res, next) => {
  try {
    const _user = await User.findOne({ "local.email": req.body.email });

    if (_user && _user.local.emailactive == true) {
      //eger verıtabanında varsa o kısı bura calısır

      res.json({ message: "User already exist. Please login!!" });
    } else if ((_user && _user.local.emailactive == false) || _user == null) {
      if (_user) {
        await User.findByIdAndRemove({ _id: _user._id });
      }
      const newUser = await new User();

      (newUser.local.email = req.body.email),
        (newUser.local.name = req.body.first),
        (newUser.local.surname = req.body.last),
        (newUser.local.password = await bcrypt.hash(req.body.pass, 10));
      (newUser.local.id = newUser._id), await newUser.save();

      const activation_token = createActivationToken(newUser);

      const url = process.env.WEB_SITE_URL + "auth/verify/" + activation_token;

      sendEmail(newUser.local.email, url);
      res.json({ message: "check your mailbox" });
    }
  } catch (err) {
    console.log(err);
  }
};

const forgetPass = async (req, res, next) => {
  try {
    const _user = await User.findOne({ "local.email": req.body.Email });

    if (_user && _user.local.emailactive == true) {
      const activatTokenForPass = generateAccessToken(_user);

      const url =
        process.env.WEB_SITE_URL + "auth/resetPassword/" + activatTokenForPass;

      passwordEmail(_user.local.email, url);

      res.json({ message: "check your mailbox" });
    } else if ((_user && _user.local.emailactive == false) || _user == null) {
      res.json({ message: "User with that email does not exist" });
    }
  } catch (err) {
    console.log(err);
  }
};

const logout = (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.redirect(
      process.env.NODE_ENV === "localhost"
        ? `${process.env.WEB_SITE_URL}`
        : `${process.env.WEB_SITE_URL_DEV_PROD}`
    );
  });
};

const resetPassword = async (req, res, next) => {
  const { value, token } = req.body;

  if (token) {
    try {
      const ıdUser = await jwt.verify(
        token,
        process.env.RESET_PASSWORD_JWT_SECRET
      );

      const findUser = await User.findOne({ "local.id": ıdUser.id }); //db passwordfindfor

      const timeValues = findUser.local.passwordResetTime.getTime();
      const tokenTime = ıdUser.time;

      if (Number(timeValues) > Number(tokenTime)) {
        res.json({ message: "jwt invalid" });
      } else {
        const dbPsword = findUser.local.password;

        const passCompare = await bcrypt.compare(value.password, dbPsword);

        if (passCompare) {
          res.json({ message: "You tried an old password" });
        } else {
          const passUpdate = await bcrypt.hash(value.password, 10);

          now = new Date();

          await User.findByIdAndUpdate(ıdUser.id, {
            "local.password": passUpdate,
            "local.passwordResetTime": now,
          });

          res.json({ message: "Password was updated successfuly" });
        }
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  } else {
    res.json({ message: "No token" });
  }
};

module.exports = {
  register,
  login,
  forgetPass,
  logout,
  verifymail,
  getUserInfo,
  loginFailed,

  resetPassword,
};
