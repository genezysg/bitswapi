const Planet = require('../models/planet.js');

exports.GetPlanets = (req,res,next) => {
    var query=Planet.find({}).populate({path:'movies',populate:{path:'movie'}})
    query.exec((err,planets)=>{
        if (err){
            res.send(500,err)
            next()
        }
        res.send(planets)
        next()
    })
}

exports.PostPlanet = (req,res,next) =>{
    let np = new Planet(req.body);
    np.save((err,saved) => {
        if (err) res.send(500,err)
        res.send(201,saved)
        next()
    })

}
