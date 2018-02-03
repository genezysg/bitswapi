const mongoose = require('../db/mongoose')
const Planet = mongoose.model.Planet;

module.exports.GetPlanets = (req,res,next) => {
    var query=Planet.find({})
    query.exec((err,planets)=>{
        if (err){
            res.send(500,err)
            next()
        }
        res.send(planets)
        next()
    })
}

module.exports.PostPlanet = (req,res,next) =>{
    let np = new Planet({name:req.body.name});
    np.save((err,saved) => {
        if (err) res.send(500,err)
        res.send(201,saved)
        next()
    })

}
