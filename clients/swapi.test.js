process.env.NODE_ENV = 'test';

const chai = require("chai"),
	  expect=chai.expect;

const swapi=require("./swapi")


it('should return 2 appearances',(done)=>{
	swapi.getAppearances("Alderaan",(err,res)=>{
		expect(res).to.be.equal(2)
		done()
	})
})

it('should return 0 appearances',(done)=>{
	swapi.getAppearances('ooince',(err,res)=>{
		expect(res).to.be.equal(0)
		done()
	})
})
