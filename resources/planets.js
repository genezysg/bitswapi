const statuscode = require('http-status-codes');

const Planet = require('../models/planet.js');





const handleError= (error,res) => {
    res.send(statuscode.INTERNAL_SERVER_ERROR,error)
}


exports.GetPlanets = (req,res,next) => {
    var query=Planet.find({})

    query.exec((err,planets) => {
        if (err) {
            handleError(err,res)
            next()

            return;
        }
        res.send(planets)
        next()
    })
}

exports.PostPlanet = (req,res,next) => {
    const np = new Planet(req.body);

    np.save((err,saved) => {
        if (err) {
            handleError(err,res)
            next()

            return;
        }
        res.send(statuscode.Ok,saved)
        next()
    })
}

exports.UpdatePlanet = (req,res,next) => {
        Planet.findById(req.params.id,(err,planet) => {
            if (err) {
                handleError(err,res)
                next();

                return;
            }
            planet.set(req.body)
            planet.save((errup,updatedPlanet) => {
                if (errup) {
                    handleError(err,res)
                    next()

                    return;
                }
                res.send(updatedPlanet)
            })
        })
    next()
}
