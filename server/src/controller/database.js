const mongoose = require("mongoose")
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} = process.env;

const main = async()=>{

  try{

    if(process.env.NODE_ENV === "localhost"){
               
      await mongoose.connect(`mongodb://127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}`,{
        
          useNewUrlParser:true,
          useUnifiedTopology: true
         
      });
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

