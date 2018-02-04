process.env.NODE_ENV = 'test';

const chai = require("chai"),
	  chaiHttp= require("chai-http"),
	  expect=chai.expect;


chai.use(chaiHttp)


const server=require("../server")

it('should return a list of planets in a json format',(done)=>{
	chai.request(server).get('/planets').end((err,res)=>{
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

it('should have a new planet with the movies',(done)=>{
	chai.request(server).post('/planets').send({name:"Alderaan",climate:"desert",terrain:"mountais"})
	.then((res)=>{
		expect(res.body).to.have.property('movies')
		done()
	})
})

