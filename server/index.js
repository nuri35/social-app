const express = require("express")
const app = express()
require('dotenv').config();
const MongoStore = require('connect-mongo')
 const database = require("./src/controller/database")
const bodyParser = require("body-parser")
const cors = require("cors")
const session = require("express-session")
const cookieParser = require('cookie-parser')
const blogRouter = require("./src/router/blogRouter")
const authrouter = require("./src/router/auth_router") 
const commentRouter = require("./src/router/commnet_router")
 const likeDislike = require("./src/router/action")
const passport = require("passport");
const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD
  } = process.env;



app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    
    store:  MongoStore.create(process.env.NODE_ENV === "production" ? {mongoUrl: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`} : process.env.NODE_ENV === "development" ? {
        mongoUrl: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin` } : {
        mongoUrl: `mongodb://localhost:${process.env.MONGODB_LOCAL_PORT}/${process.env.MONGODB_DATABASE}` }) ,
    cookie:{
        secure: true,
        maxAge:1000 * 60 * 60 * 24 
    }//1 gun

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({origin:"http://localhost:3000",credentials:true})) 
app.use(cookieParser())
 app.use(bodyParser.json({limit:"50mb",extended:true})) 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

database.main()


//router
app.use('/blogs',blogRouter)
app.use('/comment',commentRouter)

 app.use("/action",likeDislike)

 app.use("/auth",authrouter)



const server = app.listen(process.env.PORT,()=>{
    console.log("bu port dınlenıyor: " + process.env.PORT)
})


module.exports = server