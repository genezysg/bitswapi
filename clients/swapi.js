const request = require('request')
const logger = require('../logger')


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
