const mongoose = require("mongoose")

    const userSchema = new mongoose.Schema({
    
      local            : {
        id:{
          type:mongoose.ObjectId,
        },
        name: {
          type:String,
          trim:true,
          minlength:3,
          maxlength:25
      },
      surname:{
        type:String,
        trim:true,
        minlength:2,
        maxlength:25
      },
     
      email:{
        type:String,
        trim:true,
        minlength:3,
        lowercase:true,
        validate: {
            validator: function(v) {
                return  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
                
            },
            message: "Please enter a valid email"
            
           
          },
      },
      password:{
            type:String,
            index:true,
            trim:true,
        //    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i",


      },
      avatar:{
        type:String,
        default:null
      },

      emailactive:{
        type:Boolean,
        default:false 
      },

      passwordResetTime:{
        type:Date,
        default:new Date()
      }
    },
    google           : {

      idProf         : String,
      email        : String,
      token        : String,
      name         : String,
      id        : mongoose.ObjectId,
      avatar         : String,
  },
 
    },{collection:"user",timestamps:true});



    const user = mongoose.model("user",userSchema)



    module.exports = user; 