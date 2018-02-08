const request = require('request')
const logger = require('../logger')

var findPlanet= function (planet) {
    return function(element) {
    if (element.name===planet) {
        logger.info('swapi.findPlanet',element)

        return element;
    }
}
}

exports.getAppearances=(planet,callback) => {
    const param={search:planet}
    const traceid=logger.trace()

    request.get(
        {
        url:'https://swapi.co/api/planets',
        qs:param,
        headers:{'Content-Type':'application/json'}
        },
        (err,res) => {
        const json=JSON.parse(res.body)
        let found=0
        const zero=0

        found=json.results.find((element) => {
            if (element.name===planet) {
                logger.info(traceid,'swapi.getAppearances - found planet',planet)

                return element;
            }
        })
        if (found===undefined) {
            logger.info(traceid,'swapi.getAppearances - planet not found',planet)

            return callback(err,zero);
        }
        logger.info(traceid,'swapi.getAppearances - found appearances',found.films.length)
        callback(err,found.films.length)
    }
    )
}

exports.Planet={}



exports.Planet.getByName = (planet,callback) => {
    const param={search:planet}
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
    const found=json.results.find(findPlanet(planet))

    if (found===undefined) {
            logger.info(traceid,'swapi.planet.getByName - planet not found',planet)

            return callback(new Error('Planet not found'),null);
    }
    logger.info(traceid,'swapi.planet.getByName - planet found',found)

    return callback(null,found)
    }
)
}
