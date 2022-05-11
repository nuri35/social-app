const mongoose = require("mongoose")
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} = process.env;

 async function main() {
  


           try{
     
              if(process.env.NODE_ENV === "localhost"){
             
                 await mongoose.connect("mongodb://localhost:27017/Blog",{ useNewUrlParser: true});
              }
              
              
                if(process.env.NODE_ENV === "development"){
                
                  await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,{ useNewUrlParser: true,
                useUnifiedTopology: true});
                }


                if(process.env.NODE_ENV === "production"){
               
                  await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,{ useNewUrlParser: true,
                useUnifiedTopology: true});
                }
    

  
          console.log(process.env.NODE_ENV + " modunda baglantı salandı");
     


           }catch(err){
            console.log(err+"baglantı saglanamadı")
        }
      } 
          

 

module.exports = {
  main

};

