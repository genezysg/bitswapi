const statuscode = require('http-status-codes');

const Planet = require('../models/planet.js');





const handleError= (error,res) => {
    res.send(statuscode.INTERNAL_SERVER_ERROR,error)
}


exports.list = (req,res,next) => {
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

exports.post = (req,res,next) => {
    const np = new Planet(req.body);

    np.save((err,saved) => {
        if (err) {
            handleError(err,res)
            next()

            return;
        }
        res.send(statuscode.CREATED,saved)
        next()
    })
}

exports.update = (req,res,next) => {
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

exports.delete = (req,res,next) => {
    Planet.remove(req.params.id,(err) => {
        if (err) {
            res.send(statuscode.NOT_FOUND)

            return next()
        }
        res.send(statuscode.NO_CONTENT)
        next()
    })
}
