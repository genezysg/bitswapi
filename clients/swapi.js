const request = require('request')

const url="https://swapi.co/api/planets"
exports.getMoviesByPlanet=(planet)=>{
	request.get({url:url,headers:{"Content-Type":"application/json"}},(err,res) => {
		let planets=JSON.parse(res.body)
		console.log(planets.results[0].films,planet)

	})
}

exports.getMoviesByPlanet("lol")