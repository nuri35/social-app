const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const server = require("../../index");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const request = require("supertest");
const expect = chai.expect;

let Cookies;
let userId;
let notfy;
let nullNotfy = "62b832dd6e512ec44ba20275";

describe("Notify Api", () => {
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
  context("/api/notify/ POST", (done) => {
    it("ıt should create notifications", (done) => {
      const newNotification = {
        id: "62a06c373bf535cc411df613", //commentıd
        recipients: "62a06c373bf535cc411df633",
        url: "htpp://deneme.comblablabla",
        text: "bllalblal notifaction",
      };
      let req = request(server).post("/api/notify");
      req.cookies = Cookies;
      req
        .set("content-type", "application/json")
        .send(newNotification)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body)
            .to.have.property("notify")
            .to.have.keys(
              "id",
              "recipients",
              "url",
              "text",
              "user",
              "isRead",
              "_id",
              "createdAt",
              "updatedAt"
            );
          notfy = res.body.notify._id;

          done(err);
        });
    });
    it("req.user.id similar to recipient's id ", (done) => {
      const newNotification = {
        id: "62a06c373bf535cc411df633",
        recipients: "62a45905ac36df289c2f5dcb",
        url: "htpp://deneme.comblablabla",
        text: "zxassa commented blalbalbla notifaction",
      };
      let req = request(server).post("/api/notify");
      req.cookies = Cookies;
      req
        .set("content-type", "application/json")
        .send(newNotification)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.a("null");
          done(err);
        });
    });
  });

  context("/api/notifies/ GET", (done) => {
    it("it should get notifications by id", (done) => {
      let req = request(server).get("/api/notifies/");
      req.cookies = Cookies;
      req
        .set("content-type", "application/json")
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("notifies").to.be.a("array");
          done(err);
        });
    });
  });

  context("/api/isReadNotify/:id PATCH", (done) => {
    it("it should uptade isReadState notifications", (done) => {
      let req = request(server).patch(`/api/isReadNotify/${notfy}/`);
      req.cookies = Cookies;
      req
        .set("content-type", "application/json")
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("notifies").to.be.a("object");
          expect(res.body)
            .to.have.property("notifies")
            .that.has.property("_id")
            .that.is.to.equal(notfy);

          done(err);
        });
    });

    it("it should not uptade isReadState notifications for null", (done) => {
      let req = request(server).patch(`/api/isReadNotify/${nullNotfy}/`);
      req.cookies = Cookies;
      req
        .set("content-type", "application/json")
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("notifies").that.is.to.equal(null);

          done(err);
        });
    });
  });
});
