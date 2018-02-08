const request = require('request')
const logger = require('../logger')
const NodeCache = require('node-cache')
const mainCache = new NodeCache({stdTTL:600});

var findPlanet= function (planetName) {
    return function(element) {
    if (element.name===planetName) {
        logger.info('swapi.findPlanet',element)

        return element;
    }
}
}


var SwapiCache = function (cachekey) {
    this.cachekey=cachekey;
    this.get=function() {
        return mainCache.get(this.cachekey)
    };
    this.set=function(value) {
        return mainCache.set(this.cachekey,value)
    }
}

exports.getAppearances=(planetName,callback) => {
    const traceid=logger.trace()
    const zero=0

    cache=new SwapiCache(`appearances-${planetName}`)

    if (cache.get()) {
        logger.info(traceid,'swapi.getAppearances - found in cache',planetName)

        return callback(null,cache.get())
    }

    exports.Planet.getByName(planetName,(err,res) => {
        if (err) {
            logger.error(traceid,'swapi.getAppearances',err)

            return callback(err,null);
        }
        if (res===undefined) {
            logger.info(traceid,'swapi.getAppearances - not-found',planetName)
            cache.set(zero)

            return callback(null,zero);
        }
        logger.info(traceid,'swapi.getAppearances - found appearances',res.films.length)
        cache.set(res.films.length)
        callback(null,res.films.length)
    })

    }



exports.Planet={}
exports.Movie={}



exports.Planet.getByName = (planetName,callback) => {
    const param={search:planetName}
    const traceid=logger.trace()

    request.get(
    {
    url:'https://swapi.co/api/planets',
    qs:param,
    headers:{'Content-Type':'application/json'}
    },
    (err,res) => {
    if (err) {
        return callback(err,null)
    }
    const json=JSON.parse(res.body)
    const found=json.results.find(findPlanet(planetName))

    if (found===undefined) {
        logger.info(traceid,'swapi.planet.getByName - planet not found',planetName)
    }
    logger.info(traceid,'swapi.planet.getByName - planet found',found)

    return callback(null,found)
    }
)
}




exports.Movie.getByUrl = (urlMovie,callback) => {
    const traceid = logger.trace()

    request.get(
    {
    url:urlMovie,
    headers:{'Content-Type':'application/json'}
    },
    (err,res) => {
    if (err) {
        return callback(err,null)
    }
    const movie=JSON.parse(res.body)

    if (movie===undefined) {
        logger.info(traceid,'swapi.movie.getByUrl - movie not found',urlMovie)
    }
    logger.info(traceid,'swapi.movie.getByUrl- movie found',movie)

    return callback(null,movie)
    }
)
}
