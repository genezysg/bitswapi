process.env.NODE_ENV = 'test';

const chai = require("chai"),
      chaiHttp= require("chai-http"),
      expect=chai.expect;


chai.use(chaiHttp)


const server=require("../server")

it('should return a list of planets in a json format',(done) => {
    chai.request(server).get('/planets').end((err,res) => {
        if (err){
            expect.fail(err,"error")
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done()
    })
})



it('should insert a new planet',(done)=>{
    chai.request(server).post('/planets').send({name:"Alderaan",climate:"desert",terrain:"mountais"})
    .then((res)=>{
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        done()
    })
})



it('should update a planet',(done) => {

    chai.request(server).post('/planets/5a78be54d5ad6a2846b572fb').send
            ({name:"Tatooine",climate:"watery",terrain:"mountais"})
    .then((res)=>{
        expect(res.body).to.deep.include({climate:"watery",terrain:"mountais"});
        done()
    })
    .catch((err) => {
        expect.fail(err)
        done()
    })
})
