let server = require("../index");
let chai = require("chai");
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);





describe('APIs de los usuarios',()=>{

    describe("Test microservicios User",()=>{
        it("Deberia crear un nuevo cliente",(done)=>{
            chai.request(server)
                .post("/register")
                .send({
                    name: "Usuario test",
                    lastName: "Apellido test",
                    email: "email",
                    password: "password",
                    telephone:  "telephone",
                    type:"cliente"
                })
                .end((err,response)=>{
                    response.should.have.status(200); 
                done();
                });
        });
        it("Deberia crear un nuevo editorial",(done)=>{
            chai.request(server)
                .post("/register")
                .send({
                    name: "Editorial test",
                    email: "email",
                    password: "password",
                    address:  "telephone",
                    type:"editorial"
                })
                .end((err,response)=>{
                    response.should.have.status(200); 
                done();
                });
        });
    });
});