process.env.NODE_ENV = 'test';

const chai = require("chai"),
	  expect=chai.expect;

const swapi=require("./swapi")

it('should return movies',(done)=>{
	swapi.getPlanet("Alderaan",(err,res)=>{
		expect(res).to.deep.include({name:"Alderaan"})
		done()
	})
	
})

it('should return no movies',(done)=>{
	swapi.getPlanet("ria",(err,res)=>{
		expect(res).to.be.null
		done()
	})
	
})

it('should return the Movie = A new Hope',(done)=>{
   swapi.getMovie("1",(err,res)=>{
		expect(res).to.deep.include({title:'A New Hope'})
		done()
	})
})