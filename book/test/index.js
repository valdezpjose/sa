let server = require("../index");
let chai = require("chai");
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);





describe('APIs de los Libros',()=>{

    describe("Test microservicios Book",()=>{
        it("Deberia crear un nuevo libro",(done)=>{
            chai.request(server)
                .post("/new")
                .send({
                    "name" : "Caracoles y su vida con los dragones",
                    "author" : "Buda",
                    "synopsis" : "Son caracoles y viven con dragones",
                    "genre" : ["Suspenso","Accion"],
                    "editorial" : "60c3b249ea0e530670ca864f",
                    "image" : "direccion.com",
                    "stock" : 24,
                    "price": 24
                })
                .end((err,response)=>{
                    response.should.have.status(200);
                done();
                });
        });
        it("Deberia actualizar un libro",(done)=>{
            chai.request(server)
                .post("/update")
                .send({
                    "name" : "Caracoles y su vida con los dragones",
                    "editorial" : "60c3b249ea0e530670ca864f",
                    "data": {"stock":23}
                })
                .end((err,response)=>{ 
                    response.should.have.status(200);
                done();
                });
        });
        it("Deberia borrar un libro",(done)=>{
            chai.request(server)
                .post("/delete")
                .send({
                    "name" : "Caracoles y su vida con los dragones",
                    "editorial" : "60c3b249ea0e530670ca864f"
                })
                .end((err,response)=>{
                    response.should.have.status(200); 
                done();
                });
        });
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