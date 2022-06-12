const chai = require("chai")
const chaiAsPromised = require('chai-as-promised')
const server = require("../../index")
const sinon = require("sinon");
const sinonChai = require('sinon-chai')
const request = require('supertest');
const blog = require("./../../src/controller/BlogController")
const expect = chai.expect




const sandbox = sinon.createSandbox()
let Cookies;

chai.use(chaiAsPromised)
chai.use(sinonChai)

describe('blogs Api', () => {
    console.log(process.env.NODE_ENV + " writing unit test")


    afterEach(() => {
       
       
        sandbox.restore()
    })


    before((done) => {
        request(server)
            .post('/api/login')
            .send({ Email: 'nurie487@gmail.com', password: 'Nuri7sen' })
            .expect(200)
            .end((err, res) => {
                expect(res.headers['set-cookie']).not.to.be.null;
                // expect(res).to.have.header('content-type', 'application/json; charset=utf-8')
                expect(res.body).to.be.a('object');
                Cookies = res.headers['set-cookie'].pop().split(';')[0];

                done();
            });

    });


    context("/api/post ", (done) => {
       
        it("ıt should new create blog post", (done) => {
            let taskBody = {
                tag: "sport",
                title: "gflrkrelk",
                Subtitle: "akakkak",
                content: "deneme ıcındır"}

                const stub = sandbox.stub(blog, 'createPost').resolves(taskBody)
            
                blog.createPost("paramters")
                .then(result => {
               
                    expect(result).to.equal(taskBody)
                    expect(stub).to.have.been.calledOnce
                    expect(stub).to.have.been.calledWith("paramters") 
                    done()
                })
                .catch(e => {
                   
                    done(e)
                })
             
                   
        });
    })

         describe("get /search ",(done)=>{

            it("all blogs get",(done) => {
                let q = "a"
                request(server)
                    .get(`/api/search?page=${1}&&q=${q}`)
                    .expect(200)
                    .end((err, res) => {
                 
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.have.property('searcharticles').to.be.a('array')
                       

                       done(err);
                    });
                });
         })

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


});


