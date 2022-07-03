const express = require("express");
const app = express();
require("dotenv").config();
const database = require("./src/controller/database");
const client = require("./src/redis/index");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
let RedisStore = require("connect-redis")(session);

const passport = require("passport");
database.main();

client.on("connect", () => {
  console.log("redis client state connected");
});

client.on("error", (err) => {
  console.log("redis client state error", err);
});

client
  .connect()
  .then((res) => {})
  .catch((err) => {
    console.log(err);
  });

app.use(
  session({
    store: new RedisStore({ client }),
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: process.env.WEB_SITE_URL, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./src/router/blogRouter"));
app.use("/api", require("./src/router/commentRouter"));
app.use("/api", require("./src/router/actionRouter"));
app.use("/auth", require("./src/router/authRouter"));
app.use("/api", require("./src/router/authRouter"));
app.use("/api", require("./src/router/notifyRouter"));

const server = app.listen(process.env.PORT, () => {
  console.log("bu port dınlenıyor: " + process.env.PORT);
});

module.exports = server;
