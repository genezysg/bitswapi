process.env.NODE_ENV = 'test';

const chai = require("chai"),
	  expect=chai.expect;

const swapi=require("./swapi")

it('should return movies',(done)=>{
	swapi.getMoviesByPlanet("Alderaan",(err,res)=>{
		//onsole.log(res)
		expect(res).to.deep.include({name:"Alderaan"})
		done()
	})
	
})

it('should return the Movie = A new Hope',(done)=>{
   swapi.getMovie("https://swapi.co/api/films/1",(err,res)=>{
		expect(res).to.deep.include({title:'A New Hope'})
		done()
	})
})