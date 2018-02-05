const request = require('request')
const qs = require('querystring')

const url="https://swapi.co"
const planetPath ="api/planets"


exports.getMoviesByPlanet=(planet,callback)=>{
	let param={search:planet}	
	request.get({url:"https://swapi.co/api/planets",qs:param,headers:{"Content-Type":"application/json"}},(err,res) => {
		callback(err,JSON.parse(res.body));
	})
}

	
exports.getMovie=(url,callback)=>{
	request.get({url:url,headers:{"Content-Type":"application/json"}},(err,res) =>{
		callback(err,JSON.parse(res.body))
	})
}
