const http = require('http');

const Vonage = require('@vonage/server-sdk')
const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  signatureSecret: process.env.SIGNATURE_SECRET,
  
},{debug:true})

const options = {
  timeout: 2000,
  host: 'localhost',
  port: process.env.PORT,
  path: '/blogs/search?page=1&&q=a'
};



const request = http.request(options, (res) => {
  
  if (res.statusCode == 200) {
    console.log(`HEALTHCHECK SUCCESS: Status code ${res.statusCode} - ${res.body}`);
    process.exit(0);
  } else {
    console.error(`HEALTHCHECK ERROR: Status code ${res.statusCode} - ${res.body}`);
    
    const from = "Vonage APIs"
    const to = "905360565521"
    const text = 'Docker unhealth please check and again run'

vonage.message.sendSms(from, to, text, (err, responseData) => {

    if (err) {
       console.log(err)
    } else {
        if(responseData.messages[0]['status'] === "0") {
          console.log("sent successefull")
         
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})
   

   
  }
  
});



request.on('error', function (err) {
  console.error(`HEALTHCHECK ERROR: ${err.message}`);
 
  
});

request.end();