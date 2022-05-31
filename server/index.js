const express = require("express")
const app = express()
require('dotenv').config();
const database = require("./src/controller/database")
const MongoStore = require('connect-mongo')
const bodyParser = require("body-parser")
const cors = require("cors")
const session = require("express-session")
const cookieParser = require('cookie-parser')
const blogRouter = require("./src/router/blogRouter")
const authrouter = require("./src/router/auth_router") 
const commentRouter = require("./src/router/commnet_router")
 const likeDislike = require("./src/router/action")
const notifyRouter = require("./src/router/notifyRouter")
const passport = require("passport");
database.main()
const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD
  } = process.env;
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized:true,
    
    store:  MongoStore.create(process.env.NODE_ENV === "production" ? {mongoUrl: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`} : process.env.NODE_ENV === "development" ? {
        mongoUrl: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin` } : {
        mongoUrl: `mongodb://127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}` }) ,
    cookie:{
        secure: false,
        maxAge:1000 * 60 * 60 * 24 
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({origin:`${process.env.WEB_SITE_URL}` ,credentials:true})) 
app.use(cookieParser())
 app.use(bodyParser.json({limit:"50mb",extended:true})) 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/blogs',blogRouter)
app.use('/comment',commentRouter)
app.use("/action",likeDislike)
app.use("/auth",authrouter)
 app.use("/notify",notifyRouter)

const server = app.listen(process.env.PORT,()=>{
    console.log("bu port dınlenıyor: " + process.env.PORT)
})


module.exports = server