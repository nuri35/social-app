
const chai = require("chai")
const chaiHttp = require("chai-http")
const should = require('chai').should()
const {expect} = require('chai')
const server = require("../../index")
const fs = require('fs')
const  chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)

chai.use(chaiHttp)
// let Cookies;
// let userId ;
// let commentId;
// let commentOpt;
// let whoIs;
let postIdValue ;
describe('comments Api',  () => {
    // before((done) => { //token almalıyız
    //     chai.request(server)
    //         .post('/auth/login')
            
    //         .send({ Email: 'nurie487@gmail.com', password: 'Nuri7sen'})
        
    //         .end((err, res) => {
    //             expect(res.headers['set-cookie']).not.to.be.null;
    //             expect(res).to.have.header('content-type', 'application/json; charset=utf-8')
    //             expect(res.body).to.be.a('object');
                
    //             res.should.have.status(200);
    //             Cookies = res.headers['set-cookie'].pop().split(';')[0];
    //             userId = res.body.user.id
              
    //            done();
    //         });
         
    //  });

    //  before(()=>{
    //     const data = fs.readFileSync('./postId.txt',
    //     {encoding:'utf8', flag:'r'});
    //     postIdValue = data
    //  })

    //  describe("comment/save API ",(done)=>{

    //     it("ıt should save new comment",(done) => {
    //       const commentAdd = {
    //             writer : userId ,
    //             postId : postIdValue,
    //             content:"guel llaaan"
    //       }
    //            req=  chai.request(server)
    //             .post("/comment/save/")
    //             req.cookies = Cookies;
    //             req.set('content-type','application/json')
    //             .send(commentAdd)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a("object")
    //                 res.body.result.should.be.a("array")
    //                 expect(res.body.result[0]).to.be.a('object').to.have.property('writer');
    //                 expect(res.body.result[0]).to.be.a('object').to.have.property('postId');
                   
    //                 commentId = res.body.result[0]._id
    //                 whoIs = res.body.result[0].writer
    //                 commentOpt =  res.body.result[0]
                    
                 
    //                 done()
                  
    //             });
    //         });
    //  })
     describe("comment/getComments API ",(done)=>{
        it("ıt should get all comment",async () => {
            let res = await chai.request(server)
            .post("/comment/getComments/")
            .send({
                postId  : postIdValue
            });
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('postIdbyComments').to.be.an("array")
            });
    })
    //  describe("comment/editSave API ",(done)=>{

    //     it("ıt should edit specific comment",(done) => {
    //       const updateValue = {
    //            postId : commentId,
    //            content:"guncellendi lan"
    //       }
    //            req=  chai.request(server)
    //             .put("/comment/editSave/")
    //             req.cookies = Cookies;
    //             req.set('content-type','application/json')
    //             .send(updateValue)
    //             .end((err, res) => {

    //                 res.should.have.status(200);
    //                 expect(res.body).to.be.a('object')
    //                 expect(res.body.updatedProduct).to.be.a('object')
    //                 expect(res.body).to.have.property('updatedProduct').that.has.property('_id')
    //                             .that.is.to.equal(commentOpt._id)
    //                 expect(res.body).to.have.property('updatedProduct').that.has.property('content')
    //                     .that.is.to.equal(updateValue.content)
    //                 expect(res.body).to.have.property('updatedProduct').that.has.property('writer')
    //                 expect(res.body).to.have.property('updatedProduct').that.has.property('postId')
                    
                         
    //                 done()
                  
                  
    //             });
    //         });
    //  })
    //  describe("comment/editSave API ",(done)=>{

    //     it("ıt should not edit specific comment",(done) => {
    //       const updateValue = {
    //            postId : "621e36def3748c8640785625", //commentId
    //            content:"guncellendi lansdsd"
    //       }
    //            req=  chai.request(server)
    //             .put("/comment/editSave/")
    //             req.cookies = Cookies;
    //             req.set('content-type','application/json')
    //             .send(updateValue)
    //             .end((err, res) => {

    //                 res.should.have.status(404);
    //                 expect(res.body).to.be.a('object')
    //                 done()
                  
                  
    //             });
    //         });
    //  })

    

    //  describe("comment/delete/:id API ",(done)=>{

    //     it("ıt should delete specific comment",(done) => {
        
    //            req=  chai.request(server)
    //             .delete(`/comment/delete/${commentId}`)
    //             req.cookies = Cookies;
    //             req.set('content-type','application/json')
    //             .end((err, res) => {

    //                 res.should.have.status(200);
    //                 res.body.should.be.a("object")
    //                 expect(res.body).to.have.property('success')
    //                 expect(res.body).to.have.property('message')
    //                 expect(res.body).to.have.property('ıtem').that.is.to.equal(commentId)
                   
                  
    //               done()
    //             });
    //         });
    //  })

        
   

      
  });

