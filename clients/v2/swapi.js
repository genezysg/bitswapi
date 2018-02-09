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

    static request() {
        return axios.create({
                                baseURL:'https://swapi.co/',
                                headers: {'Content-Type': 'application/json'},
                                responseType: 'json'
        })
    }


    static planetByName (planetName) {
        return new Promise((resolve,reject) => {
        var search={search:planetName}
        const cache=new SwapiCache(`planets/${planetName}`)
        const cachedValue=cache.get()

        if (cachedValue===NOTFOUND) {
            return reject(new Error(NOTFOUND))
        } else if (cachedValue) {
            return resolve(cachedValue)
        }

        SwapiClient.request().get('api/planets',{params:search})
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

    static totalAppearances(planetName) {
        return new Promise((resolve) => {
            SwapiClient.planetByName(planetName)
            .then((planet) => {
                 resolve(planet.films.length)
            })
        })

    }

}
