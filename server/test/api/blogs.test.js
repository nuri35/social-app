// const chai = require("chai");
// const chaiAsPromised = require("chai-as-promised");
// const server = require("../../index");
// const sinon = require("sinon");
// const sinonChai = require("sinon-chai");
// const request = require("supertest");
// const blog = require("./../../src/controller/BlogController");
// const expect = chai.expect;

// const sandbox = sinon.createSandbox();

// chai.use(chaiAsPromised);
// chai.use(sinonChai);

// describe("blogs Api", () => {
//   console.log(process.env.NODE_ENV + " writing unit test");

//   afterEach(() => {
//     sandbox.restore();
//   });

//   context("/api/post ", (done) => {
//     it("ıt should new create blog post", (done) => {
//       let taskBody = {
//         tag: "sport",
//         title: "gflrkrelk",
//         Subtitle: "akakkak",
//         content: "deneme ıcındır",
//       };
//       const stub = sandbox.stub(blog, "createPost").resolves(taskBody);
//       blog
//         .createPost("paramters")
//         .then((result) => {
//           expect(result).to.equal(taskBody);
//           expect(stub).to.have.been.calledOnce;
//           expect(stub).to.have.been.calledWith("paramters");
//           done();
//         })
//         .catch((e) => {
//           done(e);
//         });
//     });
//   });

//   context("api/search ", (done) => {
//     it("all blogs get", (done) => {
//       let q = "a";
//       request(server)
//         .get(`/api/search?page=${1}&&q=${q}`)
//         .expect(200)
//         .end((err, res) => {
//           expect(res.body).to.be.a("object");
//           expect(res.body).to.have.property("searcharticles").to.be.a("array");
//           expect(res.body).to.have.key("searcharticles");

//           done(err);
//         });
//     });
//   });

//   context("/apipost/:id ", (done) => {
//     it("get post one by id", (done) => {
//       const id = "62a5ed73be1a5abcf2b47d50";
//       request(server)
//         .get("/api/post/" + id)
//         .expect(200)
//         .end((err, res) => {
//           expect(res.body).to.be.a("object");
//           expect(res.body).to.have.property("_id").to.eql(id);
//           expect(res.body).to.have.property("tag");
//           expect(res.body).to.have.property("authorId");
//           expect(res.body).to.have.property("title");
//           expect(res.body).to.have.property("Subtitle");
//           expect(res.body).to.have.property("content");

//           done(err);
//         });
//     });

//     it("ıt should not get by ıd", (done) => {
//       const id = "21f55d7997a9120744229245";
//       request(server)
//         .get("/api/post/" + id)
//         .expect(404)
//         .end((err, res) => {
//           expect(res.body).to.be.a("null");

//           done(err);
//         });
//     });
//   });
// });
