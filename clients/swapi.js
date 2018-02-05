const request = require('request')
const qs = require('querystring')

const url="https://swapi.co"
const planetPath ="api/planets/"
const moviePath='/api/films/'

exports.getPlanet=(planet,callback)=>{
	let param={search:planet}	
	request.get({url:"https://swapi.co/api/planets",qs:param,headers:{"Content-Type":"application/json"}},(err,res) => {
		let json=JSON.parse(res.body)
		for(let i=0;i<json.results.length;i++){
			if (json.results[i].name==planet){
				callback(err,json.results[i])
			}
		}
		callback(err,null);
	})
}

	
exports.getMovie=(id,callback)=>{
	request.get({url:url+moviePath+id,headers:{"Content-Type":"application/json"}},(err,res) =>{
		callback(err,JSON.parse(res.body))
	})
}
