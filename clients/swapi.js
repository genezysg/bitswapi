const request = require('request')


exports.getAppearances=(planet,callback) => {
    const param={search:planet}

    request.get(
        {
        url:'https://swapi.co/api/planets',
        qs:param,
        headers:{'Content-Type':'application/json'}
        },
        (err,res) => {
        const json=JSON.parse(res.body)
        let found=null;

        found=json.results.find((element) => {
            if (element.name===planet) {
                return element;
            }
        })
        if (found===null) {
            callback(err,0)

            return;
        }
        callback(err,found.films.length)
    }
    )
}
