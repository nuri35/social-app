const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const server = require("../../index");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const request = require("supertest");
const expect = chai.expect;

let likedPostId = "62a5ed73be1a5abcf2b47d50";

describe("Actions Api", () => {
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

  context("/api/upLike/ POST", (done) => {
    it("ıt should  uplikes action", (done) => {
      const sendValue = {
        postId: likedPostId,
      };
      let req = request(server).post("/api/upLike");
      req.cookies = Cookies;
      req
        .set("content-type", "application/json")
        .send(sendValue)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.keys("success");

          done(err);
        });
    });
  });

  context("/api/unLike/ POST", (done) => {
    it("ıt should  unLikes action", (done) => {
      const sendValue = {
        postId: likedPostId,
      };
      let req = request(server).post("/api/unLike");
      req.cookies = Cookies;
      req
        .set("content-type", "application/json")
        .send(sendValue)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.keys("success");

          done(err);
        });
    });
  });

  context("/api/upDislike/ POST", (done) => {
    it("ıt should  upDislikes action", (done) => {
      const sendValue = {
        postId: likedPostId,
      };
      let req = request(server).post("/api/upDislike");
      req.cookies = Cookies;
      req
        .set("content-type", "application/json")
        .send(sendValue)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.keys("success");

          done(err);
        });
    });
  });

  context("/api/unDislike/ POST", (done) => {
    it("ıt should  unDislike action", (done) => {
      const sendValue = {
        postId: likedPostId,
      };
      let req = request(server).post("/api/unDislike");
      req.cookies = Cookies;
      req
        .set("content-type", "application/json")
        .send(sendValue)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.keys("success");

          done(err);
        });
    });
  });
});
