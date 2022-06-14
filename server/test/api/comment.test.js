const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const server = require("../../index");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const request = require("supertest");
const expect = chai.expect;

let Cookies;
let userId;
let commentId;
let commentOpt;
let whoIs;
let postIdValue;

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe("Comments Api", () => {
  before((done) => {
    request(server)
      .post("/api/login")
      .send({ Email: "nurie487@gmail.com", password: "Nuri7sen" })
      .expect(200)
      .end((err, res) => {
        expect(res.headers["set-cookie"]).not.to.be.null;
        expect(res.body).to.be.a("object");
        Cookies = res.headers["set-cookie"].pop().split(";")[0];
        userId = res.body.user.id;
        done(err);
      });
  });

  context("/api/comment/ POST", (done) => {
    it("ıt should save new comment", (done) => {
      const commentAdd = {
        writer: userId,
        postId: postIdValue,
        content: "guel llaaan",
      };
      let req = request(server).post("/api/comment");
      req.cookies = Cookies;
      req
        .set("content-type", "application/json")
        .send(commentAdd)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("result").to.be.a("array");
          expect(res.body).to.have.keys("success", "result");
          commentId = res.body.result[0]._id;
          whoIs = res.body.result[0].writer;
          commentOpt = res.body.result[0];
          done(err);
        });
    });

    it("ıt should not save new comment", (done) => {
      const commentAdd = {
        writer: userId,
        postId: postIdValue,
        content: "guel",
      };
      request(server)
        .post("/api/comment")
        .send(commentAdd)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body)
            .to.have.property("message")
            .to.be.eql("Please login");

          done(err);
        });
    });
  });
  context("/api/getComments GET ", (done) => {
    it("ıt should get all comment", async () => {
      let res = await request(server).post("/api/getComments").send({
        postId: postIdValue,
      });
      expect(res.body).to.be.a("object");
      expect(res.body).to.have.property("postIdbyComments").to.be.an("array");
    });

    it("ıt should not get all comment", async () => {
      let res = await request(server).post("/api/getComments").send({
        postId: "62a5ed73be1a5abcf2b47d53",
      });
      expect(res.status).to.equal(404);
      expect(res.body).to.be.a("object");
      expect(res.body).to.have.property("postIdbyComments").lengthOf(0);
    });
  });
  describe("/api/comment PUT ", (done) => {
    it("ıt should edit specific comment", (done) => {
      const updateValue = {
        postId: commentId, //comment
        content: "guncellendi lanxxas",
      };
      req = request(server).put("/api/comment/");
      req.cookies = Cookies;
      req
        .set("content-type", "application/json")
        .send(updateValue)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.keys("success", "updatedProduct");
          expect(res.body)
            .to.have.property("updatedProduct")
            .that.has.property("_id")
            .that.is.to.equal(commentOpt._id);
          expect(res.body)
            .to.have.property("updatedProduct")
            .that.has.property("content")
            .that.is.to.equal(updateValue.content);
          done(err);
        });
    });
  });
  describe("/api/comment PUT ", (done) => {
    it("ıt should not edit specific comment", (done) => {
      const updateValue = {
        postId: "621e36def3748c8640785625",
        content: "guncellendi lansdsd",
      };
      req = request(server).put("/api/comment/");
      req.cookies = Cookies;
      req
        .set("content-type", "application/json")
        .send(updateValue)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body)
            .to.have.property("message")
            .to.eql("You can't edit  comment error");
          done(err);
        });
    });
  });
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
