const request = require('request')
const qs = require('querystring')

const url="https://swapi.co"
const planetPath ="api/planets/"


exports.getAppearances=(planet,callback)=>{
	let param={search:planet}
	request.get({url:"https://swapi.co/api/planets",qs:param,headers:{"Content-Type":"application/json"}},(err,res) => {
		let json=JSON.parse(res.body)
		const found=json.results.find((element)=>{
			if (element.name==planet) return element
		})
		if (found===undefined){
			callback(err,0)
		}
		callback(err,found.films.length)
	})
}
