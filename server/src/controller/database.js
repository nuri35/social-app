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

    await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,{ useNewUrlParser: true,
    useUnifiedTopology: true});
    


console.log(process.env.NODE_ENV + " modunda baglantı salandı");



 }catch(err){
  console.log(err+"baglantı saglanamadı")
}

}

  


          

 

module.exports = {
  main

};

