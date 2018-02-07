const statuscode = require('http-status-codes');
const Planet = require('../models/planet.js');

const handleError= (error,res) => {
    res.send(statuscode.INTERNAL_SERVER_ERROR,error)
}

exports.list = (req,res,next) => {
    var query=null;

    if (req.params.id) {
        query=Planet.findById(req.params.id)
    } else {
        query=Planet.find(req.query)
    }

    query.exec((err,planets) => {
        if (err) {
            handleError(err,res)

            return next();
        }
        res.send(planets)
        next()
    })
}


exports.get = (req,res,next) => {
    query=Planet.findById(req.params.id)
    query.exec((err,planets) => {
        if (err) {
            handleError(err,res)

            return next();
        }
        planets.getAppearances()
        res.send(planets)
        next()
    })
}

exports.post = (req,res,next) => {
    const np = new Planet(req.body);

        np.save((err,saved) => {
            if (err) {
                handleError(err,res)

                return next();
            }
            saved.getAppearances()
            res.send(statuscode.CREATED,saved)
            next()
        })
}

exports.update = (req,res,next) => {
        Planet.findById(req.params.id,(err,planet) => {
            if (err) {
                handleError(err,res)

                return next();
            }
            planet.set(req.body)
            planet.save((errup,updatedPlanet) => {
                updatedPlanet.getAppearances()
                if (errup) {
                    handleError(err,res)

                    return next();
                }
                res.send(updatedPlanet)
            })
        })
    next()
}

exports.delete = (req,res,next) => {
    Planet.remove({_id:req.params.id},(err) => {
        if (err) {
            res.send(statuscode.NOT_FOUND)

            return next()
        }
        res.send(statuscode.NO_CONTENT)
        next()
    })
}
