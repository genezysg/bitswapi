const axios = require('axios')
const logger = require('../../logger')
const NodeCache = require('node-cache')
const mainCache = new NodeCache({stdTTL:60000});
const statuscode= require('http-status-codes')


class SwapiCache {
    constructor(key) {
        this.key=`swapi/${key}`
    }

    get() {
        return mainCache.get(this.key)
    }

    set(value) {
        return mainCache.set(this.key,value)
    }

}

const NOTFOUND='NOTFOUND'


exports.Client = class SwapiClient {


    constructor() {
        this.axios=axios.create({
                                baseURL:'https://swapi.co/',
                                headers: {'Content-Type': 'application/json'},
                                responseType: 'json'
        })
    }


    planetByName (planetName) {
        return new Promise((resolve,reject) => {
        var search={search:planetName}
        const cache=new SwapiCache(`planets/${planetName}`)
        const cachedValue=cache.get()

        if (cachedValue===NOTFOUND) {
            return reject(new Error(NOTFOUND))
        } else if (cachedValue) {
            return resolve(cachedValue)
        }

        this.axios.get('api/planets',{params:search})
            .then((res) => {
                var planet = res.data.results.find((element) => {
                        if (element.name===planetName) {
                                return element
                            }
                })
                if (planet===undefined) {
                    cache.set(NOTFOUND)
                    reject(new Error(NOTFOUND))
                } else {
                cache.set(planet)
                resolve(planet)
                }
            })
            .catch((err) => {
                if (err.response.status===statuscode.NOT_FOUND) {
                    cache.set(NOTFOUND)
                    reject(new Error(NOTFOUND))
                } else {
                    reject(err)
                }
                })
        })
    }

    totalAppearances(planetName) {
        return new Promise((resolve,reject) => {
            this.planetByName(planetName)
            .then((planet) => {
                 resolve(planet.films.length)
            })
            .catch(() => {
                resolve(0)
            })
        })
    }


    movieByURL(url) {
        return new Promise((resolve,reject) => {
            const cache=new SwapiCache(`movies/${url}`)
            const cachedValue=cache.get()

            if (cachedValue===NOTFOUND) {
                return reject(new Error(NOTFOUND))
            } else if (cachedValue) {
                return resolve(cachedValue)
            }

            this.axios.get(url).then((res) => {
                cache.set(res.data.title)
                resolve(res.data.title)
            })  
            .catch((err) => {
                if (err.response.status===statuscode.NOT_FOUND) {
                    cache.set(NOTFOUND)
                    reject(new Error(NOTFOUND))
                } else {
                    reject(err)
                }
            })

        })
    }

    moviesByPlanet(planetName) {
        return new Promise((resolve,reject) => {
            var promises=[]

            this.planetByName(planetName).then((planet) => {

                for(var ind=0; ind<planet.films.length; ind++) {
                        promises.push(this.movieByURL(planet.films[ind]))
                    }
                 resolve(Promise.all(promises)) 
            })
        })
                  
    }
        
}
