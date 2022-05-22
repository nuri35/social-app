// const chai = require("chai")
// const chaiHttp = require("chai-http")
// const should = require('chai').should()
// const {expect, assert} = require('chai')
// const server = require("../../index")
// const sinon = require("sinon");
// const blogService = require("../../src/controller/Blog_contoller")
// const fs = require('fs')
// chai.use(chaiHttp)
// chai.use(require('sinon-chai'))
// let  Cookies; 
// let postId;


// describe('blogs Api',  () => {
//     console.log(process.env.NODE_ENV + " ortamında test yazıyorum ")

//    before((done) => { //token almalıyız
//         chai.request(server)
//             .post('/auth/login')
            
//             .send({ Email: 'nurie487@gmail.com', password: 'Nuri7sen'})
        
//             .end((err, res) => {
//                 expect(res.headers['set-cookie']).not.to.be.null;
//                 expect(res).to.have.header('content-type', 'application/json; charset=utf-8')
//                 expect(res.body).to.be.a('object');
                
//                 res.should.have.status(200);
//                 Cookies = res.headers['set-cookie'].pop().split(';')[0];
                
//                done();
//             });
        
//      });   

  

//     after(()=>{
//      function getPostId(){
           
//             fs.writeFileSync('postId.txt', postId)
            
//           };
//           getPostId()
//     })
     

     
//     describe("postCreate / ",(done)=>{

//         it("ıt should new create blog post",(done) => {
          
//             const taskBody = {
//                 tag:"sport",
//                 title:"gflrkrelk",
//                 Subtitle:"akakkak",
//                 content:"deneme ıcındır",

//             }
//           let req =   chai.request(server)
//                 .post('/blogs/')
//                 req.cookies = Cookies;
//                 req.set('content-type','application/json')
//                 .send(taskBody)
//                 .end((err, res) => {
//                     if(err){
                       
//                         done(err)
//                     }
//                     assert.deepEqual(taskBody,{tag:res.body.saved.tag,title:res.body.saved.title,
//                         Subtitle:res.body.saved.Subtitle,content:res.body.saved.content})
//                     postId =  res.body.saved._id
                  
//                     res.should.have.status(200);
//                     res.body.should.have.property("message").eql("Successfully published")
//                     res.body.should.be.a("object")
//                     done();
               
                  
//                 });
//             });
//      })
  



//      describe("get /search ",(done)=>{

//         it("all blogs get",(done) => {
//             let q = "abcd"
//             chai.request(server)
//                 .get(`/blogs/search?page=${1}&&q=${q}`)
              
//                 .end((err, res) => {
                
                    
//                     res.body.should.be.a("object")
//                     expect(res.body.searcharticles).to.be.a('array')
//                     res.should.have.status(200);
                
//                    done();
//                 });
//             });
//      })

//      describe("GET post/:id ",(done)=>{

//         it("get post one by id",(done) => {
          
//            id = postId;
//             chai.request(server)
           
//             .get('/blogs/Post/'+id)
           
//             .end((err, res) => {
//                 res.should.have.status(200);


//                 res.body.should.be.a("object")
//                 res.body.should.have.property("_id").eql(id)
//                 res.body.should.have.property("tag")
//                 res.body.should.have.property("authorId")
//                 res.body.should.have.property("title")
//                 res.body.should.have.property("Subtitle")
//                 res.body.should.have.property("content")
//                 res.body.should.have.property("time")

               
                
//                done();
//             });

          
//             });

              
        

//             it("ıt should not get by ıd",(done) => {
//                 const id = "21f55d7997a9120744229245"
//                 chai.request(server)
               
//                 .get('/blogs/Post/'+id)
               
//                 .end((err, res) => {
                
//                     res.should.have.status(404);
                  
//                     expect(res.body).to.be.a("null")
                    
//                    done();
//                 });
    
              
//                 });
    
        
//      })

    
//      describe("get post/:id ",(done)=>{
//         const sandbox = sinon.createSandbox()
      
//           afterEach(function () {
//             sandbox.restore()
//           });

//   //api kontrollerınde kullanabılrsın suan sımule etmek amacıyla boyle yaptım

//   it("should stub get by ıd", function () {
//     const getStub= sandbox.stub(blogService, 'onearticleget').returns( '61f55d7997a9120744229245');

//     expect(getStub()).to.be.eq('61f55d7997a9120744229245')
//     expect(getStub()).to.be.a("string")
//     expect(getStub.calledTwice).to.be.true
  


// });


//      } )






    
     
   
      
//   });


