let server = require("../index");
let chai = require("chai");
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe('APIs de los Libros',()=>{

    describe("Test microservicios Book",()=>{
        it("Deberia retornar todos los libros",(done)=>{
            chai.request(server)
                .get("/all")
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                });
        });
        it("Deberia realizar filtros de los libros",(done)=>{
            chai.request(server)
                .post("/filter")
                .send({"name": {"$regex": "Caracoles"}})
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                });
        });
    });
});