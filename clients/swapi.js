const request = require('request')

const url="https://swapi.co"
const planetPath ="api/planets"


exports.getMoviesByPlanet=(planet,callback)=>{
	let param={name:planet}
	request.get({url:"https://swapi.co/api/planets",qs:{name:planet},headers:{"Content-Type":"application/json"}},(err,res) => {
		callback(err,JSON.parse(res.body));
	})
}

	
exports.getMovie=(url,callback)=>{
	request.get({url:url,headers:{"Content-Type":"application/json"}},(err,res) =>{
		callback(err,JSON.parse(res.body))
	})
}
